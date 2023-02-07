package com.example.module_4.service;

import com.example.module_4.model.House;
import com.example.module_4.model.Notification;
import com.example.module_4.repository.INotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NotificationService implements INotificationService{
    @Autowired
    private INotificationRepository notificationRepository;

    @Override
    public Iterable<Notification> findAll() {
        return notificationRepository.findAll();
    }


    @Override
    public Optional<Notification> findById(Long id) {
        return notificationRepository.findById(id);
    }

    @Override
    public House save(Notification notification) {
      notificationRepository.save(notification);
        return null;
    }

    @Override
    public void remove(Long id) {
           notificationRepository.deleteById(id);
    }

    @Override
    public List<Notification> getNotification(Long id) {
        return notificationRepository.getNotification(id);
    }
}
