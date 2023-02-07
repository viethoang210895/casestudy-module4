package com.example.module_4.controller;

import com.example.module_4.model.Notification;
import com.example.module_4.service.INotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/notification")
public class NotificationController {
    @Autowired
    private INotificationService notificationService;
    @PostMapping
    public ResponseEntity<String> create(@RequestBody Notification notification){
        notificationService.save(notification);
        return new ResponseEntity<>("create", HttpStatus.CREATED);
    }
    @PutMapping("{id}")
    public ResponseEntity<String> seen(@PathVariable Long id){
        Notification notification = notificationService.findById(id).get();
        notification.setStatus(true);
        notificationService.save(notification);
        return new ResponseEntity<>("seen", HttpStatus.CREATED);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Iterable<Notification>> display(@PathVariable Long id){
        Iterable<Notification> notificationList = notificationService.getNotification(id);
        if (notificationList.iterator().hasNext()){
            return new ResponseEntity<>(notificationList, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
