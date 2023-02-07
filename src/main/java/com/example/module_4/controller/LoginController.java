package com.example.module_4.controller;

import com.example.module_4.model.User;
import com.example.module_4.model.UserUpdate;
import com.example.module_4.service.LoginService;
import com.example.module_4.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
public class LoginController {
    @Autowired
    private LoginService loginService;
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User user) {
        if (loginService.login(user)) {
            return new ResponseEntity<>(userService.findUserByUsername(user.getUsername()), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/signUp")
    public ResponseEntity<String> signUp(@RequestBody User user) {
        if (loginService.signUp(user)) {
            return new ResponseEntity<>("Sign up successfully!", HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/changePw")
    public ResponseEntity<String> changePassword(@RequestBody UserUpdate userUpdate) {
        if (loginService.changePassword(userUpdate)) {
            return new ResponseEntity<>("Change password successfully!", HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
