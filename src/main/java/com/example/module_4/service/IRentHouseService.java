package com.example.module_4.service;

import com.example.module_4.model.House;
import com.example.module_4.model.ObjectSearchRangeTime;
import com.example.module_4.model.RentHouse;
import com.example.module_4.model.User;

import java.util.List;

public interface IRentHouseService extends IGeneralService<RentHouse> {
    List<RentHouse> findAllByHouse(House house);

    boolean checkRentHouse(RentHouse rentHouse);

    List<RentHouse> findAllByGuest(User guest);
    boolean checkCancel(RentHouse rentHouse);
    List<Double> inComeMonthly(Long id);
    List<House> checkOverLappingIntervals(ObjectSearchRangeTime search);
}
