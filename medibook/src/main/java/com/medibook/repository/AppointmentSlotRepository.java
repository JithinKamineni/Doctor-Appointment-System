package com.medibook.repository;

import com.medibook.entity.AppointmentSlot;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface AppointmentSlotRepository extends JpaRepository<AppointmentSlot, Long> {

    List<AppointmentSlot> findByDoctorIdAndSlotDateOrderByStartTimeAsc(Long doctorId, LocalDate slotDate);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT s FROM AppointmentSlot s WHERE s.id = :id")
    Optional<AppointmentSlot> findByIdWithPessimisticWrite(Long id);
}
