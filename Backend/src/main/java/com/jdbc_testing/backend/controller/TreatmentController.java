package com.jdbc_testing.backend.controller;

import com.jdbc_testing.backend.service.TreatmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path="/treatment")
public class TreatmentController {
    @Autowired
    private TreatmentService treatmentService;


    @CrossOrigin
    @GetMapping(path="")
    public List<Map<String, Object>> getAllTreatmentRequests() {
        return treatmentService.retrieveAllPrescriptions();
    }

    @CrossOrigin
    @GetMapping(path="/user/{id}")
    public List<Map<String, Object>> getUserTreatmentRequests(
            @PathVariable("id") int id
    ){
        return treatmentService.retriveUserPrescriptions(id);
    }

    @CrossOrigin
    @GetMapping(path = "/stage0")
    public List<Map<String, Object>> getToBeApprovedRequests(){
        return treatmentService.retrieveToBePrescribed();
    }
    @CrossOrigin
    @PostMapping
    public int postNewTreatmentRequest(
            @RequestBody Map<String, Object> body
    ){
        return treatmentService.postNewTreatmentRequest(body);
    }

    @CrossOrigin
    @PutMapping(path="{id}")
    public int completeTreatment(
            @RequestBody Map<String, Object> body,
            @PathVariable("id") int requestId
    ){
        return treatmentService.completeTreatment(body, requestId);
    }



//    @CrossOrigin
//    @GetMapping(path="/diagnosis")
//    public List<Map<String, Object>> getAllDiagnosis(){
//        return treatmentService.retrieveAllDiagnosis();
//    }
//
//    @CrossOrigin
//    @GetMapping(path="/medicalrecord")
//    public List<Map<String, Object>> getAllMedicalRecords(){
//        return treatmentService.retrieveAllMedicalRecords();
//    }
//
//    @CrossOrigin
//    @GetMapping(path="/alert")
//    public List<Map<String, Object>> getAllAlerts(){
//        return treatmentService.retrieveAllAlerts();
//    }
//
//    @CrossOrigin
//    @PostMapping(path="/add")
//    public int postOperation(@RequestParam Map<String,String> multiParams)
//    {
//        return treatmentService.add(multiParams);
//    }
//
//    @CrossOrigin
//    @PutMapping(path="/update")
//    public int putOperation(@RequestParam Map<String,String> multiParams)
//    {
//        return treatmentService.update(multiParams);
//    }
//
//    @CrossOrigin
//    @DeleteMapping(path="/delete")
//    public int deleteOperation(@RequestParam Map<String,String> multiParams)
//    {
//        return treatmentService.delete(multiParams);
//    }




}
