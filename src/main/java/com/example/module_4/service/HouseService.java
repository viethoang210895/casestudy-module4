package com.example.module_4.service;

import com.example.module_4.model.House;
import com.example.module_4.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class HouseService implements IHouseService {
    @Autowired
    private IHouseRepository houseRepository;
    @Autowired
    private IImgHouseRepository imgHouseRepository;
    @Autowired
    private ICommentRepository commentRepository;
    @Autowired
    private INotificationRepository notificationRepository;
    @Autowired
    private IRentHouseRepository rentHouseRepository;

    @Override
    public Iterable<House> findAll() {
        return houseRepository.findAll();
    }

    @Override
    public Optional<House> findById(Long id) {
        return houseRepository.findById(id);
    }

    @Override
    public House save(House house) {
        houseRepository.save(house);
        return house;
    }

    @Override
    @Transactional
    public void remove(Long id) {
        House house = findById(id).get();
        imgHouseRepository.deleteAllByHouse(house);
        commentRepository.deleteAllByHouse(house);
        rentHouseRepository.deleteAllByHouse(house);
        notificationRepository.deleteAllByHouse(house);
        houseRepository.deleteById(id);
    }

    @Override
    public List<House> top3RentHouse() {
        return houseRepository.top3RentHouse();
    }
}
