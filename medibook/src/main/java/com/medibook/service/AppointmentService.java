package com.medibook.service;

import com.medibook.dto.AppointmentRequest;
import com.medibook.dto.AppointmentResponse;
import com.medibook.entity.*;
import com.medibook.enums.AppointmentStatus;
import com.medibook.enums.ArtifactType;
import com.medibook.enums.DoctorMode;
import com.medibook.enums.SlotStatus;
import com.medibook.exception.InvalidModeException;
import com.medibook.exception.ResourceNotFoundException;
import com.medibook.exception.SlotNotAvailableException;
import com.medibook.exception.UnauthorizedException;
import com.medibook.repository.AppointmentArtifactRepository;
import com.medibook.repository.AppointmentRepository;
import com.medibook.repository.AppointmentSlotRepository;
import com.medibook.repository.DoctorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final AppointmentSlotRepository slotRepository;
    private final DoctorRepository doctorRepository;
    private final AppointmentArtifactRepository artifactRepository;
    private final AuthService authService;
    private final NotificationService notificationService;
    private final EmailService emailService;

    @Transactional
    public AppointmentResponse book(AppointmentRequest request) {
        User patient = authService.getCurrentUser();
        if (patient == null) {
            throw new UnauthorizedException("User must be logged in to book");
        }

        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found"));

        if (doctor.getMode() != DoctorMode.BOTH && doctor.getMode() != request.getMode()) {
            throw new InvalidModeException("Doctor does not support the requested mode: " + request.getMode());
        }

        AppointmentSlot slot = slotRepository.findByIdWithPessimisticWrite(request.getSlotId())
                .orElseThrow(() -> new ResourceNotFoundException("Slot not found"));

        if (!slot.getDoctor().getId().equals(doctor.getId())) {
            throw new IllegalArgumentException("Slot does not belong to the requested doctor");
        }

        if (slot.getStatus() != SlotStatus.AVAILABLE) {
            throw new SlotNotAvailableException("The requested slot is no longer available");
        }

        slot.setStatus(SlotStatus.BOOKED);
        slotRepository.save(slot);

        Appointment appointment = Appointment.builder()
                .patient(patient)
                .doctor(doctor)
                .slot(slot)
                .mode(request.getMode())
                .status(AppointmentStatus.CONFIRMED)
                .reason(request.getReason())
                .notes(request.getNotes())
                .build();
        
        appointment = appointmentRepository.save(appointment);

        String artifactContent;
        ArtifactType type;
        if (request.getMode() == DoctorMode.ONLINE) {
            type = ArtifactType.VIDEO_LINK;
            artifactContent = doctor.getVideoLink() != null ? doctor.getVideoLink() : "Video link will be provided soon";
        } else {
            type = ArtifactType.CLINIC_INFO;
            artifactContent = doctor.getClinicAddress() != null ? doctor.getClinicAddress() : "Clinic address will be provided soon";
        }

        AppointmentArtifact artifact = AppointmentArtifact.builder()
                .appointment(appointment)
                .type(type)
                .content(artifactContent)
                .build();
        artifactRepository.save(artifact);

        String title = "Appointment Confirmed";
        String message = String.format("Your appointment with Dr. %s on %s at %s is confirmed.",
                doctor.getUser().getName(), slot.getSlotDate(), slot.getStartTime());
        notificationService.createNotification(patient, title, message);

        emailService.sendAppointmentConfirmation(
                patient.getEmail(),
                patient.getName(),
                doctor.getUser().getName(),
                slot.getSlotDate().toString(),
                slot.getStartTime().toString(),
                artifactContent
        );

        return mapToResponse(appointment);
    }

    public List<AppointmentResponse> getMyAppointments() {
        User patient = authService.getCurrentUser();
        return appointmentRepository.findByPatientIdOrderByBookingTimeDesc(patient.getId())
                .stream().map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public void cancelAppointment(Long id) {
        User patient = authService.getCurrentUser();
        Appointment appointment = appointmentRepository.findByIdAndPatientId(id, patient.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Appointment not found"));

        if (appointment.getStatus() != AppointmentStatus.CONFIRMED) {
            throw new IllegalStateException("Only confirmed appointments can be cancelled");
        }

        appointment.setStatus(AppointmentStatus.CANCELLED);
        appointmentRepository.save(appointment);

        AppointmentSlot slot = appointment.getSlot();
        slot.setStatus(SlotStatus.AVAILABLE);
        slotRepository.save(slot);
        
        notificationService.createNotification(patient, "Appointment Cancelled", "Your appointment with Dr. " + appointment.getDoctor().getUser().getName() + " has been cancelled.");
    }

    public AppointmentArtifact getArtifact(Long appointmentId) {
        User patient = authService.getCurrentUser();
        Appointment appointment = appointmentRepository.findByIdAndPatientId(appointmentId, patient.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Appointment not found"));
        return artifactRepository.findByAppointmentId(appointment.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Artifact not found"));
    }

    @Transactional
    public void updateStatus(Long id, AppointmentStatus newStatus) {
        User doctorUser = authService.getCurrentUser();
        Doctor doctor = doctorRepository.findByUserId(doctorUser.getId())
                .orElseThrow(() -> new UnauthorizedException("Only doctors can update status"));

        Appointment appointment = appointmentRepository.findByIdAndDoctorId(id, doctor.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Appointment not found"));

        if (appointment.getStatus() != AppointmentStatus.CONFIRMED) {
            throw new IllegalStateException("Only confirmed appointments can be updated to completed or no-show");
        }
        
        if (newStatus != AppointmentStatus.COMPLETED && newStatus != AppointmentStatus.NO_SHOW) {
             throw new IllegalArgumentException("Status can only be updated to COMPLETED or NO_SHOW");
        }

        appointment.setStatus(newStatus);
        appointmentRepository.save(appointment);
    }
    
    public List<AppointmentResponse> getDoctorScheduleToday() {
         User doctorUser = authService.getCurrentUser();
         Doctor doctor = doctorRepository.findByUserId(doctorUser.getId())
                .orElseThrow(() -> new UnauthorizedException("Only doctors can view schedule"));
         return appointmentRepository.findByDoctorIdAndSlotSlotDateOrderBySlotStartTimeAsc(doctor.getId(), LocalDate.now())
                 .stream().map(this::mapToResponse)
                 .collect(Collectors.toList());
    }

    private AppointmentResponse mapToResponse(Appointment appointment) {
        return AppointmentResponse.builder()
                .appointmentId(appointment.getId())
                .doctorId(appointment.getDoctor().getId())
                .doctorName("Dr. " + appointment.getDoctor().getUser().getName())
                .slotDate(appointment.getSlot().getSlotDate().toString())
                .startTime(appointment.getSlot().getStartTime().toString())
                .status(appointment.getStatus().name())
                .mode(appointment.getMode().name())
                .build();
    }
}
