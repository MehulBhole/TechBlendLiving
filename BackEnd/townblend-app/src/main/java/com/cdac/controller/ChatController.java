package com.cdac.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.entity.Chat;
import com.cdac.repository.ChatRepository;

@RestController
@CrossOrigin
public class ChatController {

	@Autowired
	private ChatRepository chatRepository;
	
	@PostMapping("/chatData")
	public void chatData(@RequestBody Chat chat) {
		chatRepository.save(chat);
	
	}
	@GetMapping("/receivechat/{Senderid}/{Receiverid}")
	public List<Chat> senderChat(@PathVariable int Senderid ,@PathVariable int Receiverid ){
		List<Chat> list = chatRepository.findBySenderId(Senderid);
		List<Chat> filteredChats = list.stream().filter(chat->chat.getReceiverId()==Receiverid).collect(Collectors.toList());
		return filteredChats;
	}
	@GetMapping("/ownerchat/{Senderid}/{Receiverid}")
	public List<Chat> ownerChat(@PathVariable int Senderid ,@PathVariable int Receiverid ){
		List<Chat> list = chatRepository.findByReceiverId(Receiverid);
		List<Chat> filteredChats = list.stream().filter(chat->chat.getSenderId()==Senderid).collect(Collectors.toList());
		return filteredChats;
	}
	@GetMapping("/receivechatowner/{Receiverid}")
	public List<Chat> senderChat(@PathVariable int Receiverid ){
		List<Chat> list = chatRepository.findByReceiverId(Receiverid);
		//List<Chat> filteredChats = list.stream().filter(chat->chat.getReceiverId()==Receiverid).collect(Collectors.toList());
		return list;
	}
}
