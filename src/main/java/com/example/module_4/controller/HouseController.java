package com.example.module_4.controller;

import com.example.module_4.model.House;
import com.example.module_4.service.IHouseService;
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
@RequestMapping("/api/houses")
@PropertySource("classpath:application.properties")
public class HouseController {
    @Autowired
    private IHouseService houseService;
    @Value("${upload.path}")
    private String link;
    @Value("${display.path}")
    private String displayLink;


    @GetMapping
    public ResponseEntity<Iterable<House>> showAll() {
        Iterable<House> house = houseService.findAll();
        if (!house.iterator().hasNext()) {
            new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(house, HttpStatus.OK);
    }


    @GetMapping("{id}")
    public ResponseEntity<House> findOne(@PathVariable("id") Long id) {
        Optional<House> house = houseService.findById(id);
        if (!house.isPresent()) {
            new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(house.get(), HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<House> editHouse(@RequestPart House house, @PathVariable("id") Long id, @RequestPart(value = "file", required = false) MultipartFile file) {
        Optional<House> oldHouse = houseService.findById(id);
        uploadFile(house, file);
        if (!oldHouse.isPresent()) {
            new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        if (file == null){
            house.setAvatar(oldHouse.get().getAvatar());
        }
        house = houseService.save(house);
        return new ResponseEntity<>(house, HttpStatus.OK);

    }

    @DeleteMapping("{id}")
    public ResponseEntity<House> delete(@PathVariable("id") Long id) {
        Optional<House> house = houseService.findById(id);
        if (!house.isPresent()) {
            new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        houseService.remove(id);
        return new ResponseEntity<>(house.get(), HttpStatus.OK);
    }

    private void uploadFile(House house, MultipartFile file){
        if (file != null) {
            String fileName = file.getOriginalFilename();
            try {
                FileCopyUtils.copy(file.getBytes(), new File(link + fileName));
            } catch (IOException ex) {
                ex.printStackTrace();
            }
            house.setAvatar(displayLink + fileName);
        }
    }

    @PostMapping
    public ResponseEntity<String> create(@RequestPart("house") House house, @RequestPart(value = "file", required = false) MultipartFile file){
        uploadFile(house, file);
        if (file == null){
            house.setAvatar("img/default1.png");
        }
        houseService.save(house);
        return new ResponseEntity<>("Create house successfully!", HttpStatus.CREATED);
    }
}
