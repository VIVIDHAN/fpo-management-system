package com.agricoop.backend.controller;

import com.agricoop.backend.entity.Procurement;
import com.agricoop.backend.repository.ProcurementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/procurements")
public class ProcurementController {

    @Autowired
    private ProcurementRepository procurementRepository;

    @GetMapping
    public List<Procurement> getAllProcurements() {
        return procurementRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Procurement> getProcurementById(@PathVariable Long id) {
        return procurementRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Procurement createProcurement(@RequestBody Procurement procurement) {
        return procurementRepository.save(procurement);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Procurement> updateProcurement(@PathVariable Long id, @RequestBody Procurement procurementDetails) {
        return procurementRepository.findById(id)
                .map(procurement -> {
                    procurement.setCommodity(procurementDetails.getCommodity());
                    procurement.setQuantity(procurementDetails.getQuantity());
                    procurement.setPrice(procurementDetails.getPrice());
                    procurement.setGrade(procurementDetails.getGrade());
                    procurement.setTotalAmount(procurementDetails.getTotalAmount());
                    procurement.setStatus(procurementDetails.getStatus());
                    procurement.setDate(procurementDetails.getDate());
                    return ResponseEntity.ok(procurementRepository.save(procurement));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProcurement(@PathVariable Long id) {
        return procurementRepository.findById(id)
                .map(procurement -> {
                    procurementRepository.delete(procurement);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
