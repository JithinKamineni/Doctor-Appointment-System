package com.medibook.controller;

import com.medibook.dto.AppointmentResponse;
import com.medibook.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/doctor/schedule")
@RequiredArgsConstructor
public class DoctorDashboardController {

    private final AppointmentService appointmentService;

    @GetMapping("/today")
    public ResponseEntity<List<AppointmentResponse>> getScheduleToday() {
        return ResponseEntity.ok(appointmentService.getDoctorScheduleToday());
    }
}
