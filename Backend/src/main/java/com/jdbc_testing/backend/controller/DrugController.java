package com.jdbc_testing.backend.controller;


import com.jdbc_testing.backend.service.DrugService;
import com.jdbc_testing.backend.service.TreatmentService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path="/drug")
public class DrugController {
    @Autowired
    private DrugService drugService;


    @CrossOrigin
    @GetMapping
    public List<Map<String, Object>> getAllDrugs() {
        return drugService.retrieveAllDrugs();
    }


}
