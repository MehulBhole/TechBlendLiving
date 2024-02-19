package com.cdac.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}