package com.example.module_4.service;

import com.example.module_4.model.House;
import com.example.module_4.model.ObjectSearchRangeTime;
import com.example.module_4.model.RentHouse;
import com.example.module_4.model.User;
import com.example.module_4.repository.IHouseRepository;
import com.example.module_4.repository.IRentHouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RentHouseService implements IRentHouseService {
    @Autowired
    private IRentHouseRepository rentHouseRepository;
    @Autowired
    private IHouseRepository houseRepository;

    @Override
    public Iterable<RentHouse> findAll() {
        return rentHouseRepository.findAll();
    }

    @Override
    public Optional<RentHouse> findById(Long id) {
        return rentHouseRepository.findById(id);
    }

    @Override
    public House save(RentHouse rentHouse) {
        rentHouseRepository.save(rentHouse);
        return null;
    }

    @Override
    public void remove(Long id) {
        rentHouseRepository.deleteById(id);
    }

    @Override
    public List<RentHouse> findAllByHouse(House house) {
        return rentHouseRepository.findAllByHouse(house);
    }

    @Override
    public boolean checkRentHouse(RentHouse rentHouse) {
        if (rentHouse.getStartDay().isAfter(rentHouse.getEndDay())){
            return false;
        }
        if (rentHouse.getStartDay().isBefore(LocalDate.now())){
            return false;
        }
        List<RentHouse> rentHouseList = rentHouseRepository.findAllHouseCheck(rentHouse.getHouse().getId());
        for (int i = 0; i < rentHouseList.size(); i++) {
            if (rentHouse.getStartDay().isBefore(rentHouseList.get(i).getEndDay())) {
                if (rentHouse.getEndDay().isBefore(rentHouseList.get(i).getStartDay())) {
                    return true;
                }
                return false;
            }
        }
        return true;
    }

    @Override
    public List<RentHouse> findAllByGuest(User guest) {
        return rentHouseRepository.findAllByGuest(guest);
    }

    @Override
    public boolean checkCancel(RentHouse rentHouse) {
        if (LocalDate.now().plusDays(1).isBefore(rentHouse.getStartDay())) {
            return true;
        }
        return false;
    }

    @Override
    public List<Double> inComeMonthly(Long id) {
        List<Double> incomeMonth = new ArrayList<>();
        for (int i = 1; i <= 9; i++) {
            if (rentHouseRepository.inComeMonthlyFrom1to9(id, i) != null) {
                incomeMonth.add(rentHouseRepository.inComeMonthlyFrom1to9(id, i));
            } else {
                incomeMonth.add(0.0);
            }
        }
        for (int i = 10; i <= 12; i++) {
            if (rentHouseRepository.inComeMonthlyFrom10to12(id, i) != null) {
                incomeMonth.add(rentHouseRepository.inComeMonthlyFrom10to12(id, i));
            } else {
                incomeMonth.add(0.0);
            }
        }
        return incomeMonth;
    }

    @Override
    public List<House> checkOverLappingIntervals(ObjectSearchRangeTime search) {
        List<RentHouse> rent = rentHouseRepository.findAllByStatusIsTrue();
        List<House> houses = houseRepository.findAll();
        for (int i = 0; i < rent.size(); i++) {
            if ((search.getStartDay().isAfter(rent.get(i).getStartDay()) && search.getStartDay().isBefore(rent.get(i).getEndDay()))
                    || (search.getEndDay().isAfter(rent.get(i).getStartDay()) && search.getEndDay().isBefore(rent.get(i).getEndDay()))
                    || ((!search.getStartDay().isAfter(rent.get(i).getStartDay())) && (!search.getEndDay().isBefore(rent.get(i).getEndDay())))) {
                houses.remove(rent.get(i).getHouse());
            }
        }
        return houses;
    }
}
