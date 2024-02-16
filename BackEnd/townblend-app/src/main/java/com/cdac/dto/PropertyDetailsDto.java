package com.cdac.dto;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.cdac.entity.PropertyOwner;

@Component
public class PropertyDetailsDto {

	private String rentalType; 
    private String furnished; 
    private String address;
    private long rent;
 
public long getRent() {
		return rent;
	}
	public void setRent(long rent) {
		this.rent = rent;
	}
	   private MultipartFile image1;

	private PropertyOwner owner;
	
	
	public String getRentalType() {
		return rentalType;
	}
	public void setRentalType(String rentalType) {
		this.rentalType = rentalType;
	}
	public String getFurnished() {
		return furnished;
	}
	public void setFurnished(String furnished) {
		this.furnished = furnished;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	

	
	public MultipartFile getImage1() {
		return image1;
	}
	public void setImage1(MultipartFile image1) {
		this.image1 = image1;
	}

	public PropertyOwner getOwner() {
		return owner;
	}
	public void setOwner(PropertyOwner owner) {
		this.owner = owner;
	}
}
