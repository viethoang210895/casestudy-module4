package com.example.module_4.service;

import com.example.module_4.model.House;
import com.example.module_4.model.User;
import com.example.module_4.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class UserService implements IUserService{
    @Autowired
    private IUserRepository userRepository;

    @Override
    public Iterable<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public House save(User user) {
        userRepository.save(user);
        return null;
    }

    @Override
    public void remove(Long id) {
        userRepository.deleteById(id);
    }


    @Override
    public User findUserByUsername(String username) {
        return userRepository.findUserByUsername(username);
    }
}
