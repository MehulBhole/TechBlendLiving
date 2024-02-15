package com.cdac.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Id;


@Entity
@Table(name="PropertyDetails")
public class PropertyDetails {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String rentalType; 
    private String furnished; 
    private long rent;
    private int ownerOriginalId;

	private String address;
    private String image1;
    
    @ManyToOne
	@JoinColumn(name="propertyOwner_id")
	@JsonBackReference
	private PropertyOwner owner;
    
    public int getOwnerOriginalId() {
		return ownerOriginalId;
	}

	public void setOwnerOriginalId(int ownerOriginalId) {
		this.ownerOriginalId = ownerOriginalId;
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

	public PropertyOwner getOwner() {
		return owner;
	}

	public void setOwner(PropertyOwner owner) {
		this.owner = owner;
	}

}
