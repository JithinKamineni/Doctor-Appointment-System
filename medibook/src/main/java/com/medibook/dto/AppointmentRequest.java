package com.medibook.dto;

import com.medibook.enums.DoctorMode;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AppointmentRequest {
    @NotNull
    private Long doctorId;

    @NotNull
    private Long slotId;

    @NotNull
    private DoctorMode mode;

    private String reason;
    private String notes;
}
