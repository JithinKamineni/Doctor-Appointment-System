package com.medibook.repository;

import com.medibook.entity.AppointmentArtifact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AppointmentArtifactRepository extends JpaRepository<AppointmentArtifact, Long> {
    Optional<AppointmentArtifact> findByAppointmentId(Long appointmentId);
}
