package com.jdbc_testing.backend.controller;


import com.jdbc_testing.backend.service.ExamHistoryService;
import com.jdbc_testing.backend.service.GeneralService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path="/examhistory")
public class ExamHistoryController {

    @Autowired
    private ExamHistoryService examHistoryService;

//    @GetMapping(path="user/{userid}")
//    public List<Map<String, Object>> getExamByUser(
//            @PathVariable("userid") int userId
//    ){return generalService.retrieveMultipleColumns("Select * from EXAMPLEHISTORY WHERE UserID=" + userId );
//    }

    @CrossOrigin
    @GetMapping(path="{animalId}")
    public List<Map<String, Object>> getExamByAnimal(
            @PathVariable("animalId") int animalId
        ){
        return examHistoryService.getExamByAnimal(animalId);


        }
    @CrossOrigin
    @PostMapping
    public int postExamResult(
            @RequestBody Map<String, Object> body
    ){
        return examHistoryService.postExamResult(body);
    }





}
