package com.example.module_4.controller;

import com.example.module_4.model.User;
import com.example.module_4.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@PropertySource("classpath:application.properties")
public class UserController {
    @Autowired
    private UserService userService;
    @Value("${upload.path}")
    private String link;
    @Value("${display.path}")
    private String displayLink;

    @PutMapping("/update_user")
    public ResponseEntity<User> updateUser(@RequestPart User user, @RequestPart(value = "file", required = false) MultipartFile file) {
        Optional<User> oldUser = userService.findById(user.getId());
        uploadFile(user, file);
        if (file == null){
            user.setImg(oldUser.get().getImg());
        }
        userService.save(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    private void uploadFile(User user, MultipartFile file){
        if (file != null) {
            String fileName = file.getOriginalFilename();
            try {
                FileCopyUtils.copy(file.getBytes(), new File(link + fileName));
            } catch (IOException ex) {
                ex.printStackTrace();
            }
            user.setImg(displayLink + fileName);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> findOne(@PathVariable Long id){
        return new ResponseEntity<>(userService.findById(id).get(), HttpStatus.OK);
    }
}
