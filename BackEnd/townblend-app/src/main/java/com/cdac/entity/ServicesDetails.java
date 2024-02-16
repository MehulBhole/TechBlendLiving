package com.cdac.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="Service_details")
public class ServicesDetails {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	private String serviceName;
	private String city;
	private String pinCode;
	private int rating;
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	private String description;

	public void setPinCode(String pinCode) {
		this.pinCode = pinCode;
	}
	
	public String getPinCode() {
		return pinCode;
	}
	private int providerOriginalId;
	
	@ManyToOne
	@JoinColumn(name="serviceProvider_id")
	@JsonBackReference
	private ServiceProvider provider;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getServiceName() {
		return serviceName;
	}
	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}
	public int getRating() {
		return rating;
	}
	public void setRating(int rating) {
		this.rating = rating;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	
	
	public int getProviderOriginalId() {
		return providerOriginalId;
	}
	public void setProviderOriginalId(int providerOriginalId) {
		this.providerOriginalId = providerOriginalId;
	}
	public ServiceProvider getProvider() {
		return provider;
	}
	public void setProvider(ServiceProvider provider) {
		this.provider = provider;
	}
	
}
