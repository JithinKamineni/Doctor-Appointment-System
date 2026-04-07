package com.medibook.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Async
    public void sendAppointmentConfirmation(String toEmail, String patientName, String doctorName, String date, String time, String artifactContent) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(toEmail);
            helper.setSubject("Appointment Confirmed - MediBook");

            String htmlContent = String.format(
                    "<html><body>" +
                    "<h2>Hello %s,</h2>" +
                    "<p>Your appointment with <b>%s</b> is confirmed.</p>" +
                    "<p><b>Date:</b> %s<br><b>Time:</b> %s</p>" +
                    "<p><b>Details:</b> %s</p>" +
                    "<br><p>Thank you for using MediBook!</p>" +
                    "</body></html>",
                    patientName, doctorName, date, time, artifactContent
            );

            helper.setText(htmlContent, true);
            mailSender.send(message);

        } catch (MessagingException e) {
            // Log error
            System.err.println("Failed to send email: " + e.getMessage());
        }
    }
}
