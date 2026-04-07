package com.medibook.controller;

import com.medibook.dto.AppointmentRequest;
import com.medibook.dto.AppointmentResponse;
import com.medibook.entity.AppointmentArtifact;
import com.medibook.enums.AppointmentStatus;
import com.medibook.service.AppointmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    @PostMapping
    public ResponseEntity<AppointmentResponse> book(@Valid @RequestBody AppointmentRequest request) {
        return new ResponseEntity<>(appointmentService.book(request), HttpStatus.CREATED);
    }

    @GetMapping("/my")
    public ResponseEntity<List<AppointmentResponse>> getMyAppointments() {
        return ResponseEntity.ok(appointmentService.getMyAppointments());
    }

    @PatchMapping("/{id}/cancel")
    public ResponseEntity<Void> cancelAppointment(@PathVariable Long id) {
        appointmentService.cancelAppointment(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/artifact")
    public ResponseEntity<AppointmentArtifact> getArtifact(@PathVariable Long id) {
        return ResponseEntity.ok(appointmentService.getArtifact(id));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> updateStatus(@PathVariable Long id, @RequestParam AppointmentStatus status) {
        appointmentService.updateStatus(id, status);
        return ResponseEntity.ok().build();
    }
}
