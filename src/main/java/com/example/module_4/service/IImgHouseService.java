package com.example.module_4.service;

import com.example.module_4.model.House;
import com.example.module_4.model.ImgHouse;

import java.util.List;


public interface IImgHouseService extends IGeneralService<ImgHouse> {
    List<ImgHouse> findImgHousesByHouse(House house);
}
