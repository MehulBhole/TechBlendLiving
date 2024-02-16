package com.cdac.service;

import java.util.List;

import org.apache.catalina.mapper.Mapper;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.dto.ServiceDetailsDto;
import com.cdac.entity.ServiceProvider;
import com.cdac.entity.ServicesDetails;
import com.cdac.exception.ServiceException;
import com.cdac.repository.ServiceDetailsRepository;

@Service
public class ServiceDetailsService {
	@Autowired
	private ServiceDetailsRepository serviceDetailsRepository;
	
	@Autowired
	private ServiceProviderService serviceProviderService;
	 @Autowired
	    private ModelMapper modelMapper;
	 
	public void addServiceDetails(ServicesDetails serviceDetails) {
		serviceDetailsRepository.save(serviceDetails);
	}
	
	//chatgpt
	/*
	 * public void addServiceDetails(int providerId, ServicesDetails serviceDetails)
	 * { ServiceProvider serviceProvider =
	 * serviceProviderService.getProvider(providerId); if (serviceProvider == null)
	 * { throw new ServiceException("Service Provider not found"); }
	 * serviceDetails.setProvider(serviceProvider);
	 * serviceDetailsRepository.save(serviceDetails); }
	 */
	public void  ServiceDetails(int id , ServiceDetailsDto serviceDetailsDto) {
		serviceDetailsDto.setProviderOriginalId(id);
		
		ServicesDetails serviceDetails = modelMapper.map(serviceDetailsDto, ServicesDetails.class);
		serviceDetailsRepository.save(serviceDetails);
	}
	public ServicesDetails findById(int id) {
		return serviceDetailsRepository.findById(id).get();
	}
	
	public List<ServicesDetails> findByCity(String city) {
		return serviceDetailsRepository.findByCity(city);
	}
	public List<ServicesDetails> findByProviderId(int id){
		return serviceDetailsRepository.findByProviderOriginalId(id);
	}

	public void deleteById(int id) {
		serviceDetailsRepository.deleteById(id);
		
	}
	
}
