package com.example.module_4.service;

import com.example.module_4.model.Notification;

import java.util.List;

public interface INotificationService extends IGeneralService<Notification> {
    List<Notification> getNotification(Long id);
}
