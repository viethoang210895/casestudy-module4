package com.example.module_4.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RentHouse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "guest_id")
    private User guest;

    @ManyToOne
    @JoinColumn(name = "house_id")
    private House house;

    private LocalDate startDay;
    private LocalDate endDay;
    //true khi đặt phòng, false khi hủy phòng
    private boolean status;
    //chỉ check-in được nếu status = true, chỉ tính tiền các phòng đã check-in
    private boolean checkIn;

}
