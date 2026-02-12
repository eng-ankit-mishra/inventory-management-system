package com.example.inventory.controller;


import com.example.inventory.entity.User;
import com.example.inventory.repository.UserRepository;
import com.example.inventory.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private final UserRepository userRepository;
    private final EmailService emailService;

    @GetMapping("/pending-users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> getPendingUsers(){
        List<User> pending=userRepository.findByEmailVerifiedTrueAndEnabledFalse();
        return ResponseEntity.ok(pending);
    }

    @GetMapping("/active-users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> getActiveUsers(){
        List<User> active=userRepository.findByEnabledTrue();
        return ResponseEntity.ok(active);
    }



    @PutMapping("/approve/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> approveUser(@PathVariable Long userId){
        User user=userRepository.findById(userId).orElseThrow(()->new RuntimeException("User Not Found"));
        user.setEnabled(true);
        userRepository.save(user);

        String link="http://localhost:8080/login";
        String emailContent=emailService.buildEmail(user.getEmail(),link,"Account Approved!");
        emailService.send(user.getEmail(),emailContent);

        return ResponseEntity.ok("User Approved");
    }

}
