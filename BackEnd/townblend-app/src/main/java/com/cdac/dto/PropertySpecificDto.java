package com.cdac.dto;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.cdac.entity.PropertyOwner;

@Component
public class PropertySpecificDto {

	private String rentalType; 
    private String furnished; 
    private String address;
    private long rent;
    private int ownerOriginalId;
    private String image1;
    private int id;
    private String name;
    private String email;
    private String phoneNo;
public int getOwnerOriginalId() {
		return ownerOriginalId;
	}
	public void setOwnerOriginalId(int ownerOriginalId) {
		this.ownerOriginalId = ownerOriginalId;
	}
	public String getImage1() {
		return image1;
	}
	public void setImage1(String image1) {
		this.image1 = image1;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhoneNo() {
		return phoneNo;
	}
	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}
public long getRent() {
		return rent;
	}
	public void setRent(long rent) {
		this.rent = rent;
	}
	   

	
	
	
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
	
}
