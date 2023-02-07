package com.example.module_4.repository;

import com.example.module_4.model.House;
import com.example.module_4.model.ImgHouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IImgHouseRepository extends JpaRepository<ImgHouse, Long> {
    List<ImgHouse> findAllByHouse(House house);
    void deleteAllByHouse(House house);
}
