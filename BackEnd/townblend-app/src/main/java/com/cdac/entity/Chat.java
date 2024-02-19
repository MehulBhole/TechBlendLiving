package com.cdac.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Chat {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY )
	int id;
private String senderName;
public String getSenderName() {
	return senderName;
}
public void setSenderName(String senderName) {
	this.senderName = senderName;
}
public int getId() {
	return id;
}
public void setId(int id) {
	this.id = id;
}

public int getSenderId() {
	return senderId;
}
public void setSenderId(int senderId) {
	this.senderId = senderId;
}
public int getReceiverId() {
	return receiverId;
}
public void setReceiverId(int receiverId) {
	this.receiverId = receiverId;
}
public String getMessage() {
	return message;
}
public void setMessage(String message) {
	this.message = message;
}
public LocalDateTime getSentAt() {
	return sentAt;
}
public void setSentAt(LocalDateTime sentAt) {
	this.sentAt = sentAt;
}
@Column(name = "sender_id")
private int senderId;
@Column(name = "receiver_id")
private int receiverId;
@Column(name="messages")
private String message;
@Column(name = "sent_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
private LocalDateTime sentAt = LocalDateTime.now();
}
