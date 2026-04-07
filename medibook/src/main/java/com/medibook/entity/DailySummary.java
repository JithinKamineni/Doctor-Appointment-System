package com.medibook.entity;

import com.medibook.enums.DoctorMode;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "daily_summary")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DailySummary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate summaryDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "specialty_id", nullable = true) // Can be null if aggregate for all
    private Specialty specialty;

    @Enumerated(EnumType.STRING)
    private DoctorMode mode; // Can be null if both

    @Builder.Default
    private Integer totalAppointments = 0;
    
    @Builder.Default
    private Integer completedCount = 0;
    
    @Builder.Default
    private Integer cancelledCount = 0;
    
    @Builder.Default
    private Integer noShowCount = 0;
    
    @Builder.Default
    private Double totalRevenue = 0.0;
}
