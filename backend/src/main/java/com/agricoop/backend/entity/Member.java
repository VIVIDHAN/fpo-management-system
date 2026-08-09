package com.agricoop.backend.entity;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "members")
public class Member {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
    
    private String memberIdStr;
    private String village;
    private Double landHolding;
    private Double shareCapital;
    private String status;
}
