package com.example.module_4.repository;

import com.example.module_4.model.House;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IHouseRepository extends JpaRepository<House, Long> {
    @Query(value = "select house.*, count(house_id) as c from house join rent_house rh on house.id = rh.house_id\n" +
            "group by house_id\n" +
            "order by c DESC limit 3", nativeQuery = true)
    List<House> top3RentHouse();
}
