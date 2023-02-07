package com.example.module_4.controller;

import com.example.module_4.model.ImgHouse;
import com.example.module_4.service.IHouseService;
import com.example.module_4.service.IImgHouseService;
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
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/img/house")
@PropertySource("classpath:application.properties")
public class ImgHouseController {
    @Autowired
    private IImgHouseService imgHouseService;
    @Autowired
    private IHouseService houseService;
    @Value("${upload.path}")
    private String link;
    @Value("${display.path}")
    private String displayLink;

    @GetMapping
    public ResponseEntity<Iterable<ImgHouse>> showAll() {
        Iterable<ImgHouse> imgHouse = imgHouseService.findAll();
        if (!imgHouse.iterator().hasNext()) {
            new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(imgHouse, HttpStatus.OK);
    }

    private void uploadFile(ImgHouse imgHouse, MultipartFile file){
        if (file != null) {
            String fileName = file.getOriginalFilename();
            try {
                FileCopyUtils.copy(file.getBytes(), new File(link + fileName));
            } catch (IOException ex) {
                ex.printStackTrace();
            }
            imgHouse.setImg(displayLink + fileName);
        }
    }

    @PostMapping
    public ResponseEntity<String> create(@RequestPart("img") ImgHouse imgHouse, @RequestPart(value = "file", required = false) MultipartFile file){
        String fileName = file.getOriginalFilename();
        if(fileName == null){
          return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        uploadFile(imgHouse, file);
        imgHouseService.save(imgHouse);
        return new ResponseEntity<>("Create Image successfully!", HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<ImgHouse>> findImgByHouse(@PathVariable Long id){
        List<ImgHouse> imgHouses = imgHouseService.findImgHousesByHouse(houseService.findById(id).get());
        if (!imgHouses.isEmpty()){
            return new ResponseEntity<>(imgHouses, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
