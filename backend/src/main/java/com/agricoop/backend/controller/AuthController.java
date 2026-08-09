package com.agricoop.backend.controller;
import com.agricoop.backend.entity.User;
import com.agricoop.backend.entity.Role;
import com.agricoop.backend.repository.UserRepository;
import com.agricoop.backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.agricoop.backend.service.EmailService;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private EmailService emailService;

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody Map<String, String> request) throws Exception {
        String identifier = request.get("phone");
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(identifier, request.get("password"))
            );
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("error", "Incorrect credentials"));
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(identifier);
        final String jwt = jwtUtil.generateToken(userDetails);
        User user = userRepository.findByPhone(userDetails.getUsername()).orElseThrow();

        return ResponseEntity.ok(Map.of("token", jwt, "role", user.getRole().name(), "name", user.getName()));
    }
    
    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        if (userRepository.findByPhone(request.get("phone")).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Phone already registered"));
        }
        
        try {
            emailService.sendOtpEmail(email);
            return ResponseEntity.ok(Map.of("message", "OTP sent to " + email));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", "Failed to send OTP email: " + e.getMessage()));
        }
    }
    
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Map<String, String> request) {
        if (userRepository.findByPhone(request.get("phone")).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Phone already registered"));
        }
        
        String email = request.get("email");
        String otp = request.get("otp");
        
        if (!emailService.verifyOtp(email, otp)) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid or expired OTP"));
        }
        
        User user = new User();
        user.setName(request.get("name"));
        user.setPhone(request.get("phone"));
        user.setEmail(email);
        user.setPasswordHash(passwordEncoder.encode(request.get("password")));
        user.setRole(Role.valueOf(request.getOrDefault("role", "MEMBER").toUpperCase()));
        
        userRepository.save(user);
        return ResponseEntity.ok(Map.of("message", "User registered successfully."));
    }
}
