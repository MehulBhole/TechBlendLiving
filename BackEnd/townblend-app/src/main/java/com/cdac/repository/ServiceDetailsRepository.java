package com.cdac.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.entity.ServicesDetails;

public interface ServiceDetailsRepository extends JpaRepository<ServicesDetails, Integer> {
	public List<ServicesDetails> findByProviderOriginalId(int id);
	public List<ServicesDetails> findByCity(String city);
  
}
