package com.cdac.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.entity.Admin;
import com.cdac.entity.PropertyOwner;
import com.cdac.entity.ApprovalStatus;
import com.cdac.entity.Feedback;
import com.cdac.entity.ServiceProvider;
import com.cdac.repository.AdminRepository;
import com.cdac.repository.FeedbackRepository;
import com.cdac.repository.PropertyOwnerRepository;
import com.cdac.repository.ServiceProviderRepository;

@Service
public class AdminService {
	@Autowired
	private FeedbackRepository feedbackRepository;
	
	@Autowired
	private AdminRepository adminRepository; 
	@Autowired 
	private PropertyOwnerRepository propertyOwnerRepository;
	
	@Autowired
	private ServiceProviderRepository serviceProviderRepository;
	
	public Admin registerAdmin(Admin admin) {
		return adminRepository.save(admin);
	}
	
	public boolean isAdminExists() {
		return adminRepository.count() > 0;
	}
	
	public boolean validateAdminCredentials(String email, String password) {
		Optional<Admin> adminCheck = adminRepository.findByEmail(email);
		
		return adminCheck.isPresent() && adminCheck.get().getPassword().equals(password);
	}
	
	public List<PropertyOwner> propertyOwnerForValidation(){
		PropertyOwner pr = new PropertyOwner();
		pr.setApprovalStatus(ApprovalStatus.PENDING);
		List<PropertyOwner> list = propertyOwnerRepository.findByApprovalStatus(pr.getApprovalStatus());
		return list;
	}
	public PropertyOwner validationApprovedForOwner(int id) {
		return propertyOwnerRepository.findById(id).get();
	}
	public PropertyOwner validationRejectedForOwner(int id) {
		return propertyOwnerRepository.findById(id).get();
	}

	public List<ServiceProvider> providerForValidation() {
		ServiceProvider provider = new ServiceProvider();
		provider.setApprovalStatus(ApprovalStatus.PENDING);
		List<ServiceProvider> list = serviceProviderRepository.findByApprovalStatus(provider.getApprovalStatus());
		return list;
	}
	
	public ServiceProvider validationApprovedForProvider(int id) {
		return serviceProviderRepository.findById(id).get();
	}
	public ServiceProvider validationRejectedForProvider(int id) {
		return serviceProviderRepository.findById(id).get();
	}
	public List<Feedback> getFeedbackDetails() {
		
		
		List<Feedback> f= 	feedbackRepository.findAll();
		return f ; 
}

}
