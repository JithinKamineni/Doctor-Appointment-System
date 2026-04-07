package com.medibook.repository;

import com.medibook.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
#appointment repository
@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByPatientIdOrderByBookingTimeDesc(Long patientId);
    
    // For doctor dashboard today
    List<Appointment> findByDoctorIdAndSlotSlotDateOrderBySlotStartTimeAsc(Long doctorId, LocalDate date);
    
    Optional<Appointment> findByIdAndPatientId(Long id, Long patientId);
    Optional<Appointment> findByIdAndDoctorId(Long id, Long doctorId);
}
