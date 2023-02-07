package com.example.module_4.repository;

import com.example.module_4.model.House;
import com.example.module_4.model.Notification;
import com.example.module_4.model.RentHouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface INotificationRepository extends JpaRepository<Notification , Long> {
    @Query(value = "select * from notification join house on house.id = notification.house_id where house.host_id = ?1 order by notification.id ASC", nativeQuery = true)
    List<Notification> getNotification(Long id);
    void deleteAllByHouse(House house);
}
