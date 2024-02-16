package com.cdac.controller;

import java.util.List;
import java.util.Map;
import com.cdac.entity.Feedback;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.dto.LoginStatus;
import com.cdac.dto.PropertyDetailsDto;
import com.cdac.dto.RegistrationStatus;
import com.cdac.dto.UserInfo;
import com.cdac.entity.PropertyDetails;
import com.cdac.entity.User;
import com.cdac.exception.ServiceException;
import com.cdac.service.PropertyDetailsService;
import com.cdac.service.UserService;

@RestController
@CrossOrigin
public class UserController {

	@Autowired
	private UserService userService;
	@Autowired
	private PropertyDetailsService propertyDetailsService;

	@PostMapping("/register")
	public RegistrationStatus register(@RequestBody User user) {

		try {
			String hashedPassword = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt());
			user.setPassword(hashedPassword);
			int id = userService.register(user);

			RegistrationStatus status = new RegistrationStatus();

			status.setStatus(true);
			status.setStatusMessage("User registered successfully");
			status.setId(id);
			return status;

		} catch (ServiceException e) {

			RegistrationStatus status = new RegistrationStatus();

			status.setStatus(false);
			status.setStatusMessage(e.getMessage());

			return status;
		}

	}

	@GetMapping("/allProperties")
	public List<PropertyDetails> getAllProperties() {
		List<PropertyDetails> list = propertyDetailsService.findAll();
		return list;
	}

	@GetMapping("/getSearchProperty/{search}")
	public List<PropertyDetails> getSearchProperties(@PathVariable String search) {
		List<PropertyDetails> list = propertyDetailsService.findSearchProperties(search);
		return list;
	}

	@GetMapping("/userdetails/{id}")
	public UserInfo userinfo(@PathVariable int id) {
		User user = userService.userInfo(id);
		UserInfo userinf = new UserInfo();
		BeanUtils.copyProperties(user, userinf);
		return userinf;
	}

	@PostMapping("/login")
	public LoginStatus login(@RequestBody Map<String, String> loginData) {
		try {
			String email = loginData.get("email");
			String password = loginData.get("password");

			User user = userService.login(email, password);

			LoginStatus status = new LoginStatus();

			status.setId(user.getId());
			status.setStatus(true);
			status.setStatusMessage("Login successful");

			return status;

		} catch (ServiceException e) {

			LoginStatus status = new LoginStatus();

			status.setStatus(false);
			status.setStatusMessage(e.getMessage());

			return status;
		}
	}

	@PutMapping("/update")
	public String updateUser(@RequestParam int userId, @RequestBody User updatedUser) {
		try {
			userService.editProfile(userId, updatedUser);
			return "User updated successfully";
		} catch (ServiceException e) {
			return e.getMessage();
		}
	}

	@DeleteMapping("/delete")
	public String deleteUser(@RequestParam int userId) {
		try {
			userService.deleteProfile(userId);
			return "User deleted successfully";
		} catch (ServiceException e) {
			return e.getMessage();
		}
	}

	@PostMapping("/sendFeedbackData")
	public RegistrationStatus sendFeedbackData(@RequestBody Feedback feedback ) {
		
		try {
			
			 userService.sendFeedback(feedback);
			
			RegistrationStatus status = new RegistrationStatus();
			
			status.setStatus(true);
			status.setStatusMessage("Feedback registered successfully");  
			return status;
			
		}catch(ServiceException e) {
			
			RegistrationStatus status = new RegistrationStatus();
			
			status.setStatus(false);
			status.setStatusMessage(e.getMessage());
			
			return status;
		}
    
  
}
}
