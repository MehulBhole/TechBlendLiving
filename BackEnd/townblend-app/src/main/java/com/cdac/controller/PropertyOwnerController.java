package com.cdac.controller;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

import org.mindrot.jbcrypt.BCrypt;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cdac.dto.LoginStatus;
import com.cdac.dto.PropertyDetailsDto;
import com.cdac.dto.PropertySpecificDto;
import com.cdac.dto.RegistrationStatus;
import com.cdac.dto.Status;
import com.cdac.dto.UserInfo;
import com.cdac.entity.PropertyDetails;
import com.cdac.entity.PropertyOwner;
import com.cdac.exception.ServiceException;
import com.cdac.service.PropertyDetailsService;
import com.cdac.service.PropertyOwnerService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.annotation.JsonInclude;

@RestController
@CrossOrigin
public class PropertyOwnerController {
	@Autowired
	private PropertyOwnerService propertyOwnerService;
	@Autowired
	private PropertyDetailsService propertyDetailsService;

    @Autowired
    private ModelMapper modelMapper;

	@PostMapping("/ownerregister")
	public RegistrationStatus register(@RequestBody PropertyOwner propertyOwner, Map map) {
		System.out.println("PassOwner" + propertyOwner.getPassword());
		try {
			String hashedPassword = BCrypt.hashpw(propertyOwner.getPassword(), BCrypt.gensalt());
			propertyOwner.setPassword(hashedPassword);
			int id = propertyOwnerService.register(propertyOwner);

			RegistrationStatus status = new RegistrationStatus();

			status.setStatus(true);
			status.setStatusMessage("Owner registered successfully");
			status.setId(id);
			return status;

		} catch (ServiceException e) {

			RegistrationStatus status = new RegistrationStatus();

			status.setStatus(false);
			status.setStatusMessage(e.getMessage());

			return status;
		}

	}

	@PostMapping("/owner-login")
	public LoginStatus login(@RequestBody Map<String, String> loginData) {
		try {
			String email = loginData.get("email");
			String password = loginData.get("password");

			PropertyOwner propertyOwner = propertyOwnerService.login(email, password);
			System.out.println(propertyOwner.getApprovalStatus());

			LoginStatus status = new LoginStatus();

			status.setId(propertyOwner.getId());
			status.setStatus(true);
			status.setStatusMessage("" + propertyOwner.getApprovalStatus() + "");

			return status;

		} catch (ServiceException e) {

			LoginStatus status = new LoginStatus();

			status.setStatus(false);
			status.setStatusMessage(e.getMessage());

			return status;
		}
	}

//	 
	@GetMapping("/getdetailsbyid/{id}")
	public ResponseEntity<List<PropertyDetails>> getPropertyById(@PathVariable int id) {

		List<PropertyDetails> list = propertyDetailsService.findByOwnerId(id);
		return new ResponseEntity<>(list, HttpStatus.OK);
	}
	@GetMapping("/getdetailsspecificbyid/{id}")
	public PropertySpecificDto getPropertySpecificById(@PathVariable int id) {

		PropertyDetails property = propertyDetailsService.findPropertyId(id);
		PropertyOwner owner = propertyDetailsService.findOwnerById(property.getOwnerOriginalId());
		PropertySpecificDto propertySpecificDto = modelMapper.map(property,PropertySpecificDto.class);
		propertySpecificDto.setEmail(owner.getEmail());
		propertySpecificDto.setName(owner.getName());
		propertySpecificDto.setPhoneNo(owner.getPhoneNo());
		return propertySpecificDto;
	}

	@GetMapping("/fetchImageById/{id}")
	public ResponseEntity<byte[]> getImageById(@PathVariable int id) {
		try {
			PropertyDetails propertyDetails = propertyDetailsService.getImageById(id);
			if (propertyDetails == null) {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);

			}
			Path imagePath = Paths.get("c:/uploads/" + propertyDetails.getImage1());
			byte[] imageBytes = Files.readAllBytes(imagePath);
			return new ResponseEntity<>(imageBytes, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/ownerdata/{id}")
	public UserInfo getById(@PathVariable int id) {
		PropertyOwner owner = propertyOwnerService.getOwner(id);
		UserInfo realOwner = new UserInfo();
		realOwner.setId(owner.getId());
		realOwner.setEmail(owner.getEmail());
		realOwner.setName(owner.getName());
		realOwner.setCity(owner.getAddress());
		realOwner.setPhoneNo(owner.getPhoneNo());
		return realOwner;
	}

	@PostMapping("/addProperty/{id}")
	public ResponseEntity<Status> addDetails(@PathVariable int id, PropertyDetailsDto propertyDto) {
		try {
			propertyDetailsService.PropertyDetails(id, propertyDto);
			Status status = new Status();
			status.setStatus(true);
			status.setMessageIfAny("Property details added successfully");
			return new ResponseEntity<>(status, HttpStatus.OK);
		} catch (ServiceException e) {
			Status status = new Status();
			status.setStatus(false);
			status.setMessageIfAny(e.getMessage());
			return new ResponseEntity<>(status, HttpStatus.BAD_REQUEST);
		}
	}

	private void saveFile(MultipartFile file, String fileName) throws IOException {
		InputStream is = file.getInputStream();
		FileOutputStream os = new FileOutputStream("c:/uploads/" + fileName);
		FileCopyUtils.copy(is, os);
	}

	@DeleteMapping("/propertyDetails/{propertyDetailsId}/{ownerId}")
	public ResponseEntity<Status> deletePropertyDetails(@PathVariable int propertyDetailsId,
			@PathVariable int ownerId) {
		try {
			propertyOwnerService.deletePropertyDetails(propertyDetailsId, ownerId);
			Status status = new Status();
			status.setStatus(true);
			status.setMessageIfAny("Details deleted successfully");
			return new ResponseEntity<>(status, HttpStatus.OK);
		} catch (ServiceException e) {
			Status status = new Status();
			status.setStatus(false);
			status.setMessageIfAny("Details do not exist!!!");
			return new ResponseEntity<>(status, HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping("/{ownerId}/approve")
	public ResponseEntity<Status> approveOwner(@PathVariable int ownerId) {
		try {
			propertyOwnerService.approveOwner(ownerId);
			Status status = new Status();
			status.setStatus(true);
			status.setMessageIfAny("Owner approved successfully");
			return new ResponseEntity<>(status, HttpStatus.OK);
		} catch (ServiceException e) {
			Status status = new Status();
			status.setStatus(false);
			status.setMessageIfAny(e.getMessage());
			return new ResponseEntity<>(status, HttpStatus.BAD_REQUEST);
		}
	}
	
}
