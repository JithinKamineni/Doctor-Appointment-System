package com.medibook.entity;

import com.medibook.enums.ArtifactType;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "appointment_artifact")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppointmentArtifact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "appointment_id", nullable = false, unique = true)
    private Appointment appointment;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ArtifactType type;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;
}
