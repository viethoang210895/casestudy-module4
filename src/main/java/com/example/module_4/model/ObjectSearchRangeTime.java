package com.example.module_4.model;

import java.time.LocalDate;

public class ObjectSearchRangeTime {
    private LocalDate startDay;
    private LocalDate endDay;

    public ObjectSearchRangeTime(LocalDate startDay, LocalDate endDay) {
        this.startDay = startDay;
        this.endDay = endDay;
    }

    public LocalDate getStartDay() {
        return startDay;
    }

    public void setStartDay(LocalDate startDay) {
        this.startDay = startDay;
    }

    public LocalDate getEndDay() {
        return endDay;
    }

    public void setEndDay(LocalDate endDay) {
        this.endDay = endDay;
    }
}
