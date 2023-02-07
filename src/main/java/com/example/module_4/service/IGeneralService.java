package com.example.module_4.service;

import com.example.module_4.model.House;

import java.util.Optional;

public interface IGeneralService<T>{
    Iterable<T> findAll();

    Optional<T> findById(Long id);

    House save(T t);

    void remove(Long id);
}
