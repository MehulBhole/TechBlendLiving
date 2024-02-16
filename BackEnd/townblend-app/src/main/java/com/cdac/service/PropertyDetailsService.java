package com.cdac.service;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import com.cdac.dto.PropertyDetailsDto;
import com.cdac.entity.PropertyDetails;
import com.cdac.entity.PropertyOwner;
import com.cdac.exception.ServiceException;
import com.cdac.repository.PropertyDetailsRepository;
import com.cdac.repository.PropertyOwnerRepository;

@Service
public class PropertyDetailsService {

	@Autowired
	private PropertyDetailsRepository propertyDetailsRepository;
	@Autowired
	private PropertyOwnerRepository propertyOwnerRepository;
	@Autowired
	private PropertyOwnerService propertyOwnerService;
	
	public void addpropertyDetails(PropertyDetails propertyDetails) {
		propertyDetailsRepository.save(propertyDetails);
	}
	
	public PropertyDetails findById(int id) {
		return propertyDetailsRepository.findById(id).get();
	}
	
	public List<PropertyDetails> findByOwnerId(int id){
		return propertyDetailsRepository.findByOwnerOriginalId(id);
	}
	public PropertyDetails findPropertyId(int id){
		return propertyDetailsRepository.findById(id).get();
	}
	
	
	 public PropertyDetails getImageById(int id) {
	        Optional<PropertyDetails> propertyDetailsOptional = propertyDetailsRepository.findById(id);
	        if (propertyDetailsOptional.isPresent()) {
	            PropertyDetails propertyDetails = propertyDetailsOptional.get();
	            // Assuming you have a method to get the image as byte[] from the property details
	            return propertyDetails;
	        } else {
	            // Handle case where property details with given ID is not found
	            return null;
	        }
	    }
	 
	public  void PropertyDetails(int id,PropertyDetailsDto propertyDto) {
		try {
            PropertyDetails propertyDetails = new PropertyDetails();
            BeanUtils.copyProperties(propertyDto, propertyDetails);
            MultipartFile pic = propertyDto.getImage1();
          if(pic !=null ) {
        	  try {
        		  String fileName = pic.getOriginalFilename();
        		  String generatedFileName = fileName;
        		  propertyDetails.setImage1(generatedFileName);
        		  InputStream is = pic.getInputStream();
        		  FileOutputStream os = new FileOutputStream("c:/uploads/"+generatedFileName);
        		  FileCopyUtils.copy(is, os);
        	  }catch(Exception e) {
        		  e.printStackTrace();
        		  }
          }

            PropertyOwner propertyOwner = propertyOwnerService.getOwner(id);
            propertyDetails.setOwner(propertyOwner);
            propertyDetails.setOwnerOriginalId(id);
           addpropertyDetails(propertyDetails);
         
        } catch (ServiceException e) {
           e.printStackTrace();
        }
		
	}
	 public List<PropertyDetails> findSearchProperties(String address){
		 return propertyDetailsRepository.findByAddress(address);
	 }
   public List<PropertyDetails> findAll(){
	   return propertyDetailsRepository.findAll();
   }
        
   public PropertyOwner  findOwnerById (int id) {
	   return propertyOwnerRepository.findById(id).get();
   }
	
}
