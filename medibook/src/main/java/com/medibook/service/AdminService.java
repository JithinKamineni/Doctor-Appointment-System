package com.medibook.service;

import com.medibook.entity.DailySummary;
import com.medibook.repository.DailySummaryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class AdminService {
    
    private final DailySummaryRepository dailySummaryRepository;

    public DailySummary getSummary(LocalDate date) {
        return dailySummaryRepository.findBySummaryDateAndSpecialtyIsNull(date)
                .orElse(DailySummary.builder().summaryDate(date).build());
    }
    
    // In a full application, POST/PUT/DELETE for doctors would be here.
    // Skipping full implementation to focus on core requested features for now,
    // assuming basic logic to satisfy the controller endpoints.
}
