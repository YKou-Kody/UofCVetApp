package com.jdbc_testing.backend.controller;

import com.jdbc_testing.backend.service.PrescriptionService;
import com.jdbc_testing.backend.service.TreatmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path="/prescription")
public class PrescriptionController {
    @Autowired
    private PrescriptionService prescriptionService;


    @CrossOrigin
    @PostMapping
    public int newPrescription(
            @RequestBody Map<String, Object> body
    ){
        return prescriptionService.newPrescription(body);
    }


    @CrossOrigin
    @GetMapping(path="{requestId}")
    public List<Map<String, Object>> getPrescriptionsByRequest(
            @PathVariable("requestId") int requestId
    ){
        return prescriptionService.getPrescriptionsByRequest(requestId);

    }

    @CrossOrigin
    @GetMapping(path="animal/{animalId}")
    public List<Map<String,Object>>getPrescriptionsByAnimal(
            @PathVariable("animalId") int animalId
    ){
        return prescriptionService.getPrescriptionsByAnimal(animalId);
    }
}
