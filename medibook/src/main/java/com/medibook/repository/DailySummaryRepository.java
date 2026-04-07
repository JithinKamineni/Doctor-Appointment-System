package com.medibook.repository;

import com.medibook.entity.DailySummary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface DailySummaryRepository extends JpaRepository<DailySummary, Long> {
    Optional<DailySummary> findBySummaryDateAndSpecialtyIsNull(LocalDate date);
}
