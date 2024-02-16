package com.cdac.controller;

import com.cdac.dto.LoginStatus;
import com.cdac.dto.PropertyDetailsDto;
import com.cdac.dto.PropertySpecificDto;
import com.cdac.dto.ServiceDetailsDto;
import com.cdac.dto.ServiceProviderDTO;
import com.cdac.dto.Status;
import com.cdac.entity.PropertyDetails;
import com.cdac.entity.ServiceProvider;
import com.cdac.entity.ServicesDetails;
import com.cdac.exception.ServiceException;
import com.cdac.repository.ServiceProviderRepository;
import com.cdac.service.ServiceDetailsService;
import com.cdac.service.ServiceProviderService;



import java.util.List;
import java.util.stream.Collectors;

import org.apache.logging.log4j.Logger;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@RestController
@CrossOrigin
public class ServiceProviderController {
	private static final Logger logger = LogManager.getLogger(ServiceProviderController.class);

	
			@Autowired
    private ServiceProviderService serviceProviderService;
    @Autowired
    private ServiceProviderRepository serviceProviderRepository;
    @Autowired
    private ServiceDetailsService serviceDetailsService;

    @Autowired
    private ModelMapper modelMapper;

//    @PostMapping("/registerprovider")
//    public ResponseEntity<String> registerServiceProvider(@RequestBody ServiceProviderDTO serviceProviderDTO) {
//    	
//        try {
//        	 //logger.info("Registration attempt for email: {}", serviceProviderDTO.getEmail());
//            ServiceProvider serviceProvider = modelMapper.map(serviceProviderDTO, ServiceProvider.class);
//            int providerId = serviceProviderService.registerServiceProvider(serviceProvider);
//            return ResponseEntity.status(HttpStatus.OK).body("Service provider registered with ID: " + providerId);
//        } catch (ServiceException e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
//        }
//    }
    
    //chatgpt
    @PostMapping("/registerprovider")
    public ResponseEntity<String> registerServiceProvider(@RequestBody ServiceProviderDTO serviceProviderDTO) {
        try {
        	System.out.println("phonenumber"+ serviceProviderDTO.getPhoneNumber());
            // Log registration attempt with user email
            logger.info("Registration attempt for email: {}", serviceProviderDTO.getEmail());
            
            // Map DTO to entity
            ServiceProvider serviceProvider = modelMapper.map(serviceProviderDTO, ServiceProvider.class);
            // Register service provider
            int providerId = serviceProviderService.registerServiceProvider(serviceProvider);
            // Log successful registration
            logger.info("Service provider registered with ID: {}", providerId);
            
            return ResponseEntity.status(HttpStatus.OK).body("Service provider registered with ID: " + providerId);
        } catch (ServiceException e) {
            // Log registration failure
            logger.error("Registration failed for email: {}", serviceProviderDTO.getEmail(), e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/loginprovider")
    public LoginStatus loginServiceProvider(@RequestBody ServiceProviderDTO serviceProviderDTO) {
        try {
            ServiceProvider serviceProvider = serviceProviderService.login(serviceProviderDTO.getEmail(), serviceProviderDTO.getPassword());
LoginStatus status = new LoginStatus();
			
			status.setId(serviceProvider.getId());
			status.setStatus(true);
			status.setStatusMessage(""+serviceProvider.getApprovalStatus()+"");
			
			return status;
           
        } catch (ServiceException e) {
	LoginStatus status = new LoginStatus();
			
			status.setStatus(false);
			status.setStatusMessage(e.getMessage());
			
			return status;
		}
        
    }
    @DeleteMapping("/deleteservicebyid/{id}")
    public void deleteService(@PathVariable int id) {
    	serviceDetailsService.deleteById(id);
    }
    
	/*
	 * @PostMapping("/addService/{providerId}") public ResponseEntity<String>
	 * addService(@PathVariable int providerId, @RequestBody ServicesDetails
	 * serviceDetails) { try { serviceDetailsService.addServiceDetails(providerId,
	 * serviceDetails); return
	 * ResponseEntity.status(HttpStatus.CREATED).body("Service added successfully");
	 * } catch (ServiceException e) { return
	 * ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage()); } }
	 */

	/*
	 * @GetMapping("/getserviceproviderbyid/{id}") public
	 * ResponseEntity<List<PropertyDetails>> getPropertyById(@PathVariable int id) {
	 * 
	 * List<PropertyDetails> list =
	 * serviceProviderService.findByServiceProviderId(id); return new
	 * ResponseEntity<>(list, HttpStatus.OK); }
	 */
    
    @GetMapping("/serviceproviderdata/{id}")
    public ServiceProviderDTO getServiceProvider(@PathVariable int id) {
    	ServiceProviderDTO serviceProvider=  modelMapper.map(serviceProviderService.findByServiceProviderId(id) ,ServiceProviderDTO.class);
    	return serviceProvider;
    }
    @PostMapping("/addServiceDetails/{id}")
	public ResponseEntity<Status> addDetails(@PathVariable int id, @RequestBody ServiceDetailsDto serviceDetailsDto) {
		try {
			serviceDetailsService.ServiceDetails(id, serviceDetailsDto);
			Status status = new Status();
			status.setStatus(true);
			status.setMessageIfAny("Service details added successfully");
			return new ResponseEntity<>(status, HttpStatus.OK);
		} catch (ServiceException e) {
			Status status = new Status();
			status.setStatus(false);
			status.setMessageIfAny(e.getMessage());
			return new ResponseEntity<>(status, HttpStatus.BAD_REQUEST);
		}
	}
    @GetMapping("/getservicedetailsbyid/{id}")
    public ResponseEntity<List<ServicesDetails>> getServiceById(@PathVariable int id) {
    	
    	List<ServicesDetails> list = serviceDetailsService.findByProviderId(id);

    	return new ResponseEntity<>(list,HttpStatus.OK);
    }
    @GetMapping("/getservicedetailsbycity/{city}")
    public List<ServiceDetailsDto> getServiceByCity(@PathVariable String city) {
    	
    	List<ServicesDetails> list = serviceDetailsService.findByCity(city);
    	 List<ServiceDetailsDto> serviceSpecificDto = list.stream().map(serviceDetails -> {
    	        ServiceDetailsDto dto = modelMapper.map(serviceDetails, ServiceDetailsDto.class);
    	        ServiceProvider serviceProvider = serviceProviderRepository.findById(serviceDetails.getProviderOriginalId()).orElse(null);
    	        if (serviceProvider != null) {
    	            dto.setName(serviceProvider.getName());
    	            dto.setEmail(serviceProvider.getEmail());
    	            dto.setPhoneNumber(serviceProvider.getPhoneNumber());
    	           
    	            
    	        }
    	        return dto;
    	    }).collect(Collectors.toList());
        
    	return serviceSpecificDto;
    }
}
