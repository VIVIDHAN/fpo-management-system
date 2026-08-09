package com.agricoop.backend.repository;
import com.agricoop.backend.entity.Procurement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProcurementRepository extends JpaRepository<Procurement, Long> {}
