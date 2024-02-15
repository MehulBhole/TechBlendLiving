package com.cdac.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cdac.entity.ServiceProvider;
import com.cdac.entity.ServicesDetails;
import com.cdac.entity.ApprovalStatus;
import com.cdac.exception.ServiceException;
import com.cdac.repository.ServiceDetailsRepository;
import com.cdac.repository.ServiceProviderRepository;
import org.mindrot.jbcrypt.BCrypt;

import java.util.Optional;

@Service
@Transactional
public class ServiceProviderService {

    @Autowired
    private ServiceProviderRepository serviceProviderRepository;
    
    @Autowired
    ServiceDetailsRepository serviceDetailsRepository;

    public int registerServiceProvider(ServiceProvider serviceProvider) {
        Optional<ServiceProvider> providerCheck = serviceProviderRepository.findByEmail(serviceProvider.getEmail());
        if (!providerCheck.isPresent()) {
            serviceProvider.setApprovalStatus(ApprovalStatus.PENDING);
            String hashedPassword = BCrypt.hashpw(serviceProvider.getPassword(), BCrypt.gensalt());
            serviceProvider.setPassword(hashedPassword);
            ServiceProvider savedProvider = serviceProviderRepository.save(serviceProvider);
            return savedProvider.getId();
        } else {
            throw new ServiceException("Service Provider already registered");
        }
    }
    
    public ServiceProvider findByServiceProviderId(int id) {
    	return serviceProviderRepository.findById(id).get();
    }
    
    public void approvalByHost(ServiceProvider serviceProvider) {
    	serviceProvider.setApprovalStatus(ApprovalStatus.APPROVED);
    	serviceProviderRepository.save(serviceProvider);
    }
    
    public void rejectedByHost(ServiceProvider serviceProvider) {
    	serviceProvider.setApprovalStatus(ApprovalStatus.REJECTED);
    	serviceProviderRepository.save(serviceProvider);
    }

    public ServiceProvider login(String email, String password) {
        ServiceProvider serviceProvider = serviceProviderRepository.findByEmail(email)
                .orElseThrow(() -> new ServiceException("Invalid credentials"));

        if (BCrypt.checkpw(password, serviceProvider.getPassword())) {
            return serviceProvider;
        } else {
            throw new ServiceException("Invalid credentials");
        }
    }
    
    public ServicesDetails getServiceDetails(int serviceDetailsId, int providerId) {
    	Optional<ServicesDetails> details = serviceDetailsRepository.findById(serviceDetailsId);
    	ServicesDetails servicesDetails = details.orElseThrow(()->new ServiceException("Service details not found"));
    		
    		if(servicesDetails.getProvider().getId() != providerId) {
    			throw new ServiceException("You are not approved provider for this service");
    		}
    			
    		return servicesDetails;
    }

	
}
