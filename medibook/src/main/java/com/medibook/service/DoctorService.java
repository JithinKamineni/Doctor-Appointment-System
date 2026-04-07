package com.medibook.service;

import com.medibook.entity.AppointmentSlot;
import com.medibook.entity.Doctor;
import com.medibook.enums.DoctorMode;
import com.medibook.exception.ResourceNotFoundException;
import com.medibook.repository.AppointmentSlotRepository;
import com.medibook.repository.DoctorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DoctorService {

    private final DoctorRepository doctorRepository;
    private final AppointmentSlotRepository slotRepository;

    public List<Doctor> getDoctors(Long specialtyId, DoctorMode mode) {
        return doctorRepository.findDoctorsBySpecialtyAndMode(specialtyId, mode);
    }

    public Doctor getDoctorById(Long id) {
        return doctorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found"));
    }

    public List<AppointmentSlot> getDoctorSlots(Long doctorId, LocalDate date) {
        return slotRepository.findByDoctorIdAndSlotDateOrderByStartTimeAsc(doctorId, date);
    }
}
