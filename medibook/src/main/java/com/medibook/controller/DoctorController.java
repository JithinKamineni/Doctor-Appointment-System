package com.medibook.controller;

import com.medibook.entity.AppointmentSlot;
import com.medibook.entity.Doctor;
import com.medibook.enums.DoctorMode;
import com.medibook.service.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/doctors")
@RequiredArgsConstructor
public class DoctorController {

    private final DoctorService doctorService;

    @GetMapping
    public ResponseEntity<List<Doctor>> getDoctors(
            @RequestParam(required = false) Long specialtyId,
            @RequestParam(required = false) DoctorMode mode) {
        return ResponseEntity.ok(doctorService.getDoctors(specialtyId, mode));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Doctor> getDoctorById(@PathVariable Long id) {
        return ResponseEntity.ok(doctorService.getDoctorById(id));
    }

    @GetMapping("/{id}/slots")
    public ResponseEntity<List<AppointmentSlot>> getDoctorSlots(
            @PathVariable Long id,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(doctorService.getDoctorSlots(id, date));
    }
}
