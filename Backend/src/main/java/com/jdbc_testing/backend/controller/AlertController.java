package com.jdbc_testing.backend.controller;

import com.jdbc_testing.backend.service.AlertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path="/alert")
public class AlertController {
    @Autowired
    private AlertService alertService;

    @CrossOrigin
    @GetMapping(path="{animalId}")
    public List<Map<String, Object>> getExamByAnimal(
            @PathVariable("animalId") int animalId
    ){
        return alertService.getAlertByAnimal(animalId);
    }


    @CrossOrigin
    @PostMapping
    public int addExamResult(
            @RequestBody Map<String, Object> body
    ){
        return alertService.addExamResult(body);
    }
}
