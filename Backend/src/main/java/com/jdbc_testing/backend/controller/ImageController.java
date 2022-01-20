package com.jdbc_testing.backend.controller;

import com.jdbc_testing.backend.service.AnimalStatusService;
import com.jdbc_testing.backend.service.GeneralService;
import com.jdbc_testing.backend.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path="/image")
public class ImageController {

    @Autowired
    private ImageService imageService;


    @CrossOrigin
    @GetMapping(path="{id}")
    public List<Map<String, Object>> getAnimalImages(
            @PathVariable("id") int id
    ){
        return imageService.getImagesByAnimal(id);
    }

    @CrossOrigin
    @PostMapping
    public int addImage(
            @RequestBody Map<String, Object> body
    ){

        return imageService.addImage(body);
    }
}
