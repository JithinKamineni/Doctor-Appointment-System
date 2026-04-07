package com.medibook.controller;

import com.medibook.entity.Specialty;
import com.medibook.service.SpecialtyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/specialties")
@RequiredArgsConstructor
public class SpecialtyController {

    private final SpecialtyService specialtyService;

    @GetMapping
    public ResponseEntity<List<Specialty>> getAllActiveSpecialties() {
        return ResponseEntity.ok(specialtyService.getAllActiveSpecialties());
    }
}
