package com.example.module_4.service;

import com.example.module_4.model.User;
import com.example.module_4.model.UserUpdate;
import com.example.module_4.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoginService {
    @Autowired
    private IUserRepository userRepository;

    public boolean login(User user) {
        List<User> userList = userRepository.findAll();
        for (User us : userList) {
            if (us.getUsername().equals(user.getUsername()) && us.getPassword().equals(user.getPassword())) {
                return true;
            }
        }
        return false;
    }

    public boolean signUp(User user) {
        if (!checkUserExist(user)){
            user.setImg("/src/main/resources/static/img/avatarDefault.jpg");
            userRepository.save(user);
            return true;
        }return false;
    }

    public boolean checkUserExist(User user) {
        List<User> users = userRepository.findAll();
        for (User u : users) {
            if (user.getUsername().equals(u.getUsername())) {
                return true;
            }
        }
        return false;
    }

    public boolean changePassword(UserUpdate userUpdate){
        User user_update = userRepository.findById(userUpdate.getId()).get();
        if (user_update.getPassword().equals(userUpdate.getOldPassword())){
            if (userUpdate.getNewPassword().equals(userUpdate.getAutPassword())){
                user_update.setPassword(userUpdate.getNewPassword());
                userRepository.save(user_update);
                return true;
            }
            return false;
        }
        return false;
    }

}
