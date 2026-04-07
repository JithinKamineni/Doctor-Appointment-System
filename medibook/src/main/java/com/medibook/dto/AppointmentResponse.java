package com.medibook.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AppointmentResponse {
    private Long appointmentId;
    private Long doctorId;
    private String doctorName;
    private String slotDate;
    private String startTime;
    private String status;
    private String mode;
}
