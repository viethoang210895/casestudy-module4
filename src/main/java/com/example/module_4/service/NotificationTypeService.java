package com.example.module_4.service;

import com.example.module_4.model.House;
import com.example.module_4.model.NotificationType;
import com.example.module_4.repository.INotificationTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class NotificationTypeService implements INotificationTypeService {
    @Autowired
    private INotificationTypeRepository notificationTypeRepository;

    @Override
    public Iterable<NotificationType> findAll() {
        return notificationTypeRepository.findAll();
    }

    @Override
    public Optional<NotificationType> findById(Long id) {
        return notificationTypeRepository.findById(id);
    }

    @Override
    public House save(NotificationType notificationType) {
        notificationTypeRepository.save(notificationType);
        return null;
    }

    @Override
    public void remove(Long id) {
   notificationTypeRepository.deleteById(id);
    }
}
