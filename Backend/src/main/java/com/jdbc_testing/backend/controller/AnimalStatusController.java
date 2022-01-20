package com.jdbc_testing.backend.controller;

import com.jdbc_testing.backend.service.AnimalStatusService;
import com.jdbc_testing.backend.service.GeneralService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path="/status")
public class AnimalStatusController {

    @Autowired
    private GeneralService generalService;
    @Autowired
    private AnimalStatusService animalStatusService;

    @CrossOrigin
    @GetMapping(path="{id}")
    public List<Map<String, Object>> getAnimalStatuses(
            @PathVariable("id") int id
    ){
        return generalService.retrieveMultipleColumns("Select * from ANIMALSTATUS WHERE AnimalID=" + id );
    }

    @CrossOrigin
    @PostMapping
    public int updateAnimalStatus(
            @RequestBody Map<String, Object> body
    ){
        return animalStatusService.updateAnimalStatus(body);


    }

//    @DeleteMapping(path="{statusid}")
//    public int deleteStatus(
//            @PathVariable("statusid") int id
//    ){
//        return generalService.update(
//                "DELETE FROM ANIMALSTATUS WHERE StatusID=" + id + ";"
//        );
//    }



}
