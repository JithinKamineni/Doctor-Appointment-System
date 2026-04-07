package com.medibook.entity;

import com.medibook.enums.DoctorMode;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "doctor")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "specialty_id", nullable = false)
    private Specialty specialty;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DoctorMode mode;

    private String qualification;
    
    private Integer experienceYears;
    
    private Double consultationFee;
    
    @Builder.Default
    private Double rating = 0.0;
    
    @Column(columnDefinition = "TEXT")
    private String bio;
    
    private String photoUrl;
    
    private String clinicAddress;
    
    private String videoLink;

    @Column(nullable = false)
    @Builder.Default
    private Boolean isAvailable = true;
}
