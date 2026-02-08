package com.example.inventory.service;

import com.example.inventory.dto.request.AuthenticationRequest;
import com.example.inventory.dto.request.RegisterRequest;
import com.example.inventory.dto.response.AuthenticationResponse;
import com.example.inventory.entity.ConfirmationToken;
import com.example.inventory.entity.User;
import com.example.inventory.repository.UserRepository;
import com.example.inventory.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final ConfirmationTokenService confirmationTokenService;
    private final EmailService emailService;

    public String register(RegisterRequest request) {
        // 1. Check if user already exists
        boolean userExists = repository.findByEmail(request.getEmail()).isPresent();
        if (userExists) {
            throw new IllegalStateException("Email already taken");
        }

        // 2. Create User (Enabled is FALSE by default via Entity)
        var user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                // .enabled(false) // Implicit via Entity definition
                .build();

        repository.save(user);

        // 3. Generate Verification Token
        String token = UUID.randomUUID().toString();
        ConfirmationToken confirmationToken = new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(15),
                user
        );

        confirmationTokenService.saveConfirmationToken(confirmationToken);

        // 4. Send Verification Email
        String link = "http://localhost:5173/verify?token=" + token;
        String emailContent=emailService.buildEmail(request.getEmail(),link,"Confirm Your Mail");
        emailService.send(request.getEmail(),emailContent);

        return token; // Returning token for Postman testing convenience
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        // This will FAIL if user.enabled is false (Standard Spring Security behavior)
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        var user = repository.findByEmail(request.getEmail())
                .orElseThrow();

        var jwtToken = jwtService.generateToken(user);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .role(user.getRole().name())
                .build();
    }

    @Transactional
    public String confirmToken(String token) {
        ConfirmationToken confirmationToken = confirmationTokenService
                .getToken(token)
                .orElseThrow(() -> new IllegalStateException("Token not found"));

        if (confirmationToken.getConfirmedAt() != null) {
            throw new IllegalStateException("Email already confirmed");
        }

        LocalDateTime expiredAt = confirmationToken.getExpiresAt();
        if (expiredAt.isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("Token expired");
        }

        confirmationTokenService.setConfirmedAt(token);
        User user=confirmationToken.getUser();
        user.setEmailVerified(true);
        repository.save(user);

        return "Email Verified! Please wait for admin approval to enable your account.";
    }

    // --- FORGOT PASSWORD LOGIC ---

    public void forgotPassword(String email) {
        User user = repository.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("User not found"));

        // Generate a new token for password reset
        String token = UUID.randomUUID().toString();
        ConfirmationToken resetToken = new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(15),
                user
        );

        confirmationTokenService.saveConfirmationToken(resetToken);

        // Send Reset Email
        String link = "http://localhost:5173/reset-password?token=" + token;
        String emailContent=emailService.buildEmail(email,link,"Reset Your Password");
        emailService.send(email,emailContent);


    }

    @Transactional
    public void resetPassword(String token, String newPassword) {
        ConfirmationToken resetToken = confirmationTokenService.getToken(token)
                .orElseThrow(() -> new IllegalStateException("Invalid token"));

        if (resetToken.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("Token expired");
        }

        // Update Password
        User user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        repository.save(user);

        // Ideally, delete the token or mark it as used so it can't be used again
        confirmationTokenService.setConfirmedAt(token);
    }


}