package com.example.inventory.controller;

import com.example.inventory.dto.request.AuthenticationRequest;
import com.example.inventory.dto.request.RegisterRequest;
import com.example.inventory.dto.request.ResetPasswordRequest; // You need to create this DTO
import com.example.inventory.dto.response.AuthenticationResponse;
import com.example.inventory.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*; // Changed to import all for @PostMapping/GetMapping

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request){
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(service.authenticate(request));
    }

    // --- NEW: Email Verification Endpoint ---
    @GetMapping("/confirm")
    public ResponseEntity<String> confirm(@RequestParam("token") String token) {
        return ResponseEntity.ok(service.confirmToken(token));
    }


    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestParam("email") String email) {
        service.forgotPassword(email);
        return ResponseEntity.ok("Password reset email sent.");
    }


    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestParam("token") String token,
                                                @RequestBody ResetPasswordRequest request) {
        service.resetPassword(token, request.getNewPassword());
        return ResponseEntity.ok("Password successfully reset.");
    }
}