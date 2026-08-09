package com.agricoop.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    // Temporary in-memory OTP storage (For production, use Redis or DB)
    private final Map<String, String> otpStorage = new HashMap<>();

    public void sendOtpEmail(String toEmail) {
        String otp = String.format("%06d", new Random().nextInt(999999));
        otpStorage.put(toEmail, otp);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("vividhan007@gmail.com");
        message.setTo(toEmail);
        message.setSubject("Your AgriCoop Verification OTP");
        message.setText("Welcome to AgriCoop! Your email verification OTP is: " + otp + "\n\nPlease enter this code to complete your registration.");

        mailSender.send(message);
    }

    public boolean verifyOtp(String email, String otp) {
        if (otpStorage.containsKey(email) && otpStorage.get(email).equals(otp)) {
            otpStorage.remove(email); // Clear OTP after success
            return true;
        }
        return false;
    }
}
