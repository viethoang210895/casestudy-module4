package com.example.module_4.service;

import com.example.module_4.model.House;
import com.example.module_4.model.ImgHouse;
import com.example.module_4.repository.IImgHouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ImgHouseService implements IImgHouseService {
    @Autowired
    private IImgHouseRepository imgHouseRepository;

    @Override
    public Iterable<ImgHouse> findAll() {
        return imgHouseRepository.findAll();
    }

    @Override
    public Optional<ImgHouse> findById(Long id) {
        return imgHouseRepository.findById(id);
    }

    @Override
    public House save(ImgHouse imgHouse) {
        imgHouseRepository.save(imgHouse);
        return null;
    }

    @Override
    public void remove(Long id) {
        imgHouseRepository.deleteById(id);
    }

    @Override
    public List<ImgHouse> findImgHousesByHouse(House house) {
        return imgHouseRepository.findAllByHouse(house);
    }
}
