package com.example.module_4.service;

import com.example.module_4.model.House;

import java.util.List;

public interface IHouseService extends IGeneralService<House> {
    List<House> top3RentHouse();
}
