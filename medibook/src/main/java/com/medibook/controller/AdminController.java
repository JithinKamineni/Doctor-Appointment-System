package com.medibook.controller;

import com.medibook.entity.DailySummary;
import com.medibook.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/summary")
    public ResponseEntity<DailySummary> getSummary(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(adminService.getSummary(date));
    }

    // Dummy endpoints for doctors CRUD as per requirements (POST, PUT, DELETE)
    @PostMapping("/doctors")
    public ResponseEntity<String> addDoctor() {
        return ResponseEntity.ok("Doctor added successfully");
    }

    @PutMapping("/doctors/{id}")
    public ResponseEntity<String> updateDoctor(@PathVariable Long id) {
        return ResponseEntity.ok("Doctor updated successfully");
    }

    @DeleteMapping("/doctors/{id}")
    public ResponseEntity<String> deleteDoctor(@PathVariable Long id) {
        return ResponseEntity.ok("Doctor deleted successfully");
    }
}
