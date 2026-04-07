package com.medibook.controller;

import com.medibook.entity.Notification;
import com.medibook.service.AuthService;
import com.medibook.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;
    private final AuthService authService;

    @GetMapping("/my")
    public ResponseEntity<List<Notification>> getMyNotifications() {
        Long userId = authService.getCurrentUser().getId();
        return ResponseEntity.ok(notificationService.getMyNotifications(userId));
    }

    @PatchMapping("/{id}/read")
    public ResponseEntity<Void> markAsRead(@PathVariable Long id) {
        Long userId = authService.getCurrentUser().getId();
        notificationService.markAsRead(id, userId);
        return ResponseEntity.ok().build();
    }
}
