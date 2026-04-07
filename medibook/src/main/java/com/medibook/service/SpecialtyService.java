package com.medibook.service;

import com.medibook.entity.Specialty;
import com.medibook.repository.SpecialtyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SpecialtyService {

    private final SpecialtyRepository specialtyRepository;

    public List<Specialty> getAllActiveSpecialties() {
        return specialtyRepository.findByIsActiveTrue();
    }
}
