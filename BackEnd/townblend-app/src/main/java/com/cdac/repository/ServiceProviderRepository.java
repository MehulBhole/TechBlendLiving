package com.cdac.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.entity.ServiceProvider;
import com.cdac.entity.ApprovalStatus;

public interface ServiceProviderRepository extends JpaRepository<ServiceProvider, Integer> {
	public Optional<ServiceProvider> findByEmail(String email);
	public Optional<ServiceProvider> findByEmailAndPassword(String email, String password);
	public List<ServiceProvider> findByApprovalStatus(ApprovalStatus approvalStatus);
}
