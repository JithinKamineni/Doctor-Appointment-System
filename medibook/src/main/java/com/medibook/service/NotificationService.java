package com.medibook.service;

import com.medibook.entity.Notification;
import com.medibook.entity.User;
import com.medibook.exception.ResourceNotFoundException;
import com.medibook.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public void createNotification(User user, String title, String message) {
        Notification notification = Notification.builder()
                .user(user)
                .title(title)
                .message(message)
                .isRead(false)
                .build();
        notificationRepository.save(notification);
    }

    public List<Notification> getMyNotifications(Long userId) {
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public void markAsRead(Long id, Long userId) {
        Notification notification = notificationRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Notification not found"));
        notification.setIsRead(true);
        notificationRepository.save(notification);
    }
}
