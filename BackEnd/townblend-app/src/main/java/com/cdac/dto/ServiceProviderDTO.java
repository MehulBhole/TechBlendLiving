package com.cdac.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.Pattern;

public class ServiceProviderDTO {
	private String name;
    private String email;
    
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&+=])(?=\\S+$).{8,}$", message = "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.")
    private String password;
    private String panNumber;
    private String phoneNo;
    private LocalDate dob;
    public String getPhoneNo() {
		return phoneNo;
	}
	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}
	public LocalDate getDob() {
		return dob;
	}
	public void setDob(LocalDate dob) {
		this.dob = dob;
	}
	private String city;
    
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
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getPanNumber() {
		return panNumber;
	}
	public void setPanNumber(String panNumber) {
		this.panNumber = panNumber;
	}
	public String getPhoneNumber() {
		return phoneNo;
	}
	public void setPhoneNumber(String phoneNo) {
		this.phoneNo = phoneNo;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
}
