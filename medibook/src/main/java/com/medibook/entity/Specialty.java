package com.medibook.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "specialty")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Specialty {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    private String description;
    
    private String iconUrl;

    @Column(nullable = false)
    @Builder.Default
    private Boolean isActive = true;
}
