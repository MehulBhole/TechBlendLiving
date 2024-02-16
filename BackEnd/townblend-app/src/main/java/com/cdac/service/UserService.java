package com.cdac.service;

import java.util.Optional;
import com.cdac.repository.FeedbackRepository;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.entity.Feedback;
import com.cdac.entity.User;
import com.cdac.exception.ServiceException;
import com.cdac.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private FeedbackRepository feedbackRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	public int register(User user) {
		Optional<User> userCheck = userRepository.findByEmail(user.getEmail());
		if(!userCheck.isPresent()) {
			User savedUser = userRepository.save(user);
			return savedUser.getId();
		}else {
			throw new ServiceException("User already registered");
		}
		
	}
	
	public User login(String email, String password) {
		Optional<User> userLoggedIn = userRepository.findByEmail(email);
		if(userLoggedIn.isPresent()) {
			User user = userLoggedIn.get();
			if(BCrypt.checkpw(password, user.getPassword()) || password.equals(user.getPassword())) {
				return user;
			}
			else {
				throw new ServiceException("Invalid Credentials");
			}
		}else {
			throw new ServiceException("Invalid credentails");
		}
	}
	public User userInfo(int id) {
		User user= userRepository.findById(id).get();
		return user;
	}
	
	public void editProfile(int userId, User updatedUser) {
        Optional<User> existingUser = userRepository.findById(userId);

        if (existingUser.isPresent()) {
            User userToUpdate = existingUser.get();

            //Update the fields you want to allow users to modify
            userToUpdate.setName(updatedUser.getName());
            userToUpdate.setPassword(updatedUser.getPassword());
            userToUpdate.setPhoneNo(updatedUser.getPhoneNo());
            userToUpdate.setCity(updatedUser.getCity());

            userRepository.save(userToUpdate);
        } else {
            throw new ServiceException("User not found");
        }
    }

    public void deleteProfile(int userId) {
        Optional<User> existingUser = userRepository.findById(userId);

        if (existingUser.isPresent()) {
            userRepository.deleteById(userId);
        } else {
            throw new ServiceException("User not found");
        }
    }
	public void sendFeedback(Feedback feedback) {
		try {
			Feedback reponse = feedbackRepository.save(feedback);
			System.out.println(reponse+" Saved");
		} catch (Exception e) {
			throw new ServiceException("Feedback not saved");
		}
		 
		
		
	}
    
    
}
