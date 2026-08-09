package com.agricoop.backend.entity;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "procurements")
public class Procurement {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
    
    private String commodity;
    private Double quantity;
    private Double price;
    private String grade;
    private Double totalAmount;
    private String status;
    private LocalDate date;
}
