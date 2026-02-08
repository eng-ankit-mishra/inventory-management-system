package com.example.inventory.config;


import com.example.inventory.entity.Role;
import com.example.inventory.entity.User;
import com.example.inventory.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;


@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    @Override
    public void run(String... args) throws Exception {
        String adminEmail="admin@inventory.com";

        if(userRepository.findByEmail(adminEmail).isEmpty()) {
            User admin = User.builder()
                    .name("Master Admin")
                    .email(adminEmail)
                    .password(passwordEncoder.encode("admin123"))
                    .role(Role.ADMIN)
                    .emailVerified(true)
                    .enabled(true)
                    .build();

            userRepository.save(admin);
            System.out.println("Default Admin Created: "+adminEmail);

        }else{
            System.out.println("Default Admin already exists!");
        }
    }
}
