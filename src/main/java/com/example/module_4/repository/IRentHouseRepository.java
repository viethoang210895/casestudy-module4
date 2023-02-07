package com.example.module_4.repository;

import com.example.module_4.model.House;
import com.example.module_4.model.RentHouse;
import com.example.module_4.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IRentHouseRepository extends JpaRepository<RentHouse, Long> {
    List<RentHouse> findAllByHouse(House house);
    List<RentHouse> findAllByGuest(User guest);

    @Query(value = "select * from Rent_house where status = true and house_id = ?1", nativeQuery = true)
    List<RentHouse> findAllHouseCheck(Long id);
    @Query(value = "select sum(DATEDIFF(end_day, start_day)*price) from rent_house join house h on h.id = rent_house.house_id\n" +
            "where check_in = true and h.host_id = ?1 and start_day like concat('2023-0', ?2, '%')", nativeQuery = true)
    Double inComeMonthlyFrom1to9(Long id, int month);
    @Query(value = "select sum(DATEDIFF(end_day, start_day)*price) from rent_house join house h on h.id = rent_house.house_id\n" +
            "where check_in = true and h.host_id = ?1 and start_day like concat('2023-', ?2, '%')", nativeQuery = true)
    Double inComeMonthlyFrom10to12(Long id, int month);
    List<RentHouse> findAllByStatusIsTrue();
    void deleteAllByHouse(House house);
}
