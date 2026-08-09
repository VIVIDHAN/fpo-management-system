package com.agricoop.backend.entity;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Column(unique = true)
    private String phone;
    private String email;
    private String passwordHash;
    @Enumerated(EnumType.STRING)
    private Role role;
}
