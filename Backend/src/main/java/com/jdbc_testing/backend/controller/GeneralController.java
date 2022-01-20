package com.jdbc_testing.backend.controller;

import com.jdbc_testing.backend.service.GeneralService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path="/controller")
public class GeneralController {

    @Autowired
    private GeneralService generalService;
    @GetMapping
    public List<Map<String, Object>> check() {
        return generalService.retrieveMultipleColumns("Select * from animal as A, User as U where animalID = '1' and userid=animalid");
    }


//
//    @PostMapping(path="{/{arg1}/{arg2}}")
//    public void post(@PathVariable Map<String, String> pathVariables)
//    {
//        //Multiple path variables are just for demonstration
//        //alternatively, you can make up some variables like dog_cat_dolphin
//        //and decompose them into String[]...or just modify the code in service to adopt arguments.
//        String[] arguments = {pathVariables.get("arg1"),pathVariables.get("arg1") };
//        generalService.update(arguments);
//    }
}
