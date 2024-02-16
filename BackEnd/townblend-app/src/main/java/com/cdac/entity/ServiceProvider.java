package com.cdac.entity;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

@Entity
public class ServiceProvider {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
	
	@NotBlank(message="name is required")
    private String name;
	
	@Email(message="enter valid email id")
    private String email;
	
	public LocalDate getDob() {
		return dob;
	}
	public void setDob(LocalDate dob) {
		this.dob = dob;
	}
	public List<ServicesDetails> getServices() {
		return services;
	}
	public void setServices(List<ServicesDetails> services) {
		this.services = services;
	}
	@NotBlank(message="Enter valid password")
//	@Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&+=])(?=\\S+$).{8,}$", message = "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.")
    private String password;
    
	@NotBlank(message = "PAN number is required")
	@Pattern(regexp = "[A-Z]{5}[0-9]{4}[A-Z]", message = "Invalid PAN number")
    private String panNumber;
    
    @Pattern(regexp = "^[6-9]\\d{9}$", message = "Invalid phone number")
    private String phoneNumber;
    
    @DateTimeFormat
    private LocalDate dob;
    
    @NotBlank(message="Enter city")
    private String city;
    
    private String role="SERVICEPROVIDER";
    @OneToMany(mappedBy = "provider", cascade = CascadeType.ALL)
	@JsonManagedReference
	private List<ServicesDetails> services;
    
    @Enumerated(EnumType.STRING)
	private ApprovalStatus approvalStatus;
    
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
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public String getPanNumber() {
		return panNumber;
	}
	public void setPanNumber(String panNumber) {
		this.panNumber = panNumber;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
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
	public ApprovalStatus getApprovalStatus() {
		return approvalStatus;
	}
	public void setApprovalStatus(ApprovalStatus approvalStatus) {
		this.approvalStatus = approvalStatus;
	}
}
