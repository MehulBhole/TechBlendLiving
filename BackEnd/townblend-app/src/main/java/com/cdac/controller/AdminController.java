package com.cdac.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.service.AdminService;
import com.cdac.service.PropertyOwnerService;
import com.cdac.service.ServiceProviderService;
import com.cdac.dto.AdminRespone;
import com.cdac.entity.Admin;
import com.cdac.entity.Feedback;
import com.cdac.entity.PropertyOwner;
import com.cdac.entity.ServiceProvider;
@RestController

@CrossOrigin
public class AdminController {

	 @Autowired
	 private AdminService adminService;
	 
	 @Autowired
	 private PropertyOwnerService propertyOwnerService;
	 
	 @Autowired
	 private ServiceProviderService serviceProviderService;
	 
	

	 @PostMapping("/adminregister")
	 public AdminRespone registerAdmin(@RequestBody Admin admin) {
	     if (adminService.isAdminExists()) {
	         return new AdminRespone("Admin already registered."); // Admin Testing
	     }
	     adminService.registerAdmin(admin);
	     return new AdminRespone("Admin registered successfully.");
	 }
	
	 @PostMapping("/hostlogin")
	 public AdminRespone loginAdmin(@RequestBody Map<String, String> credentials) {
	     String email = credentials.get("email");
	     String password = credentials.get("password");
	
	     if (adminService.validateAdminCredentials(email, password)) {
	    
	        	AdminRespone adminRespone = new AdminRespone("Admin login successful!");
	        	adminRespone.setStatus(true);
	         return adminRespone;
	     } else {
	    	 AdminRespone adminRespone = new AdminRespone("Invalid Credentials!");
	     	adminRespone.setStatus(false);
	      return adminRespone;
	         
	     }
	 }
	 @GetMapping("/hostapproval")
	 public  List<PropertyOwner> pendingUser() {
		  List<PropertyOwner> list  =  adminService.propertyOwnerForValidation(); 
		  return list;
	  }
	 @GetMapping("/hostapprovalbyid/{id}")
	 public  void pendingUser(@PathVariable int id) {
		  PropertyOwner propertyOwner =   adminService.validationApprovedForOwner(id);
		  propertyOwnerService.approvalByHost(propertyOwner);
		 
	  }
	 @GetMapping("/hostrejectionbyid/{id}")
	 public  void rejectedUser(@PathVariable int id) {
		  PropertyOwner propertyOwner =   adminService.validationRejectedForOwner(id);
		  propertyOwnerService.rejectByHost(propertyOwner);
		 
	 }
	 
	 @GetMapping("/providerapproval")
	 public List<ServiceProvider> pendingProvider(){
		 List<ServiceProvider> list = adminService.providerForValidation();
		 return list;
	 }
	 
	 @GetMapping("/providerapprovalbyid/{id}")
	 public ResponseEntity<String> pendingProvider(@PathVariable int id) {
		 ServiceProvider serviceProvider = adminService.validationApprovedForProvider(id);
		 serviceProviderService.approvalByHost(serviceProvider);
		 return ResponseEntity.ok("Profile has been approved by admin");
	 }
	 
	 @GetMapping("/providerrejectionbyid/{id}")
	 public  ResponseEntity<String> rejectedProvider(@PathVariable int id) {
		 ServiceProvider serviceProvider =   adminService.validationRejectedForProvider(id);
		 serviceProviderService.rejectedByHost(serviceProvider);
		 return ResponseEntity.ok("Your Profile has been rejected");
		 
	 }

@GetMapping("/fetchFeedbackDetails")
public  List<Feedback> getFeedbackDetails() {
	  List<Feedback> list  =  adminService.getFeedbackDetails(); 
	  return list;
 }
	 
  
}

