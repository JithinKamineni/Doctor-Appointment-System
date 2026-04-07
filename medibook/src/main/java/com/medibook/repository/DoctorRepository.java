package com.medibook.repository;

import com.medibook.entity.Doctor;
import com.medibook.enums.DoctorMode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    
    @Query("SELECT d FROM Doctor d WHERE " +
           "(:specialtyId IS NULL OR d.specialty.id = :specialtyId) AND " +
           "(:mode IS NULL OR d.mode = :mode OR d.mode = 'BOTH') AND " +
           "d.isAvailable = true")
    List<Doctor> findDoctorsBySpecialtyAndMode(@Param("specialtyId") Long specialtyId, @Param("mode") DoctorMode mode);
    Optional<Doctor> findByUserId(Long userId);
}
