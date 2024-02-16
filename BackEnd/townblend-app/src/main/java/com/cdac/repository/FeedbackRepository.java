package com.cdac.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.entity.Feedback;

public interface FeedbackRepository extends JpaRepository<Feedback , Integer >{

}
