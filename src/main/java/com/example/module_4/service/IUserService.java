package com.example.module_4.service;

import com.example.module_4.model.User;


public interface IUserService extends IGeneralService<User> {
    User findUserByUsername(String username);
}
