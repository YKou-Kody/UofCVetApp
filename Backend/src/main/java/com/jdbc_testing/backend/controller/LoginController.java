package com.jdbc_testing.backend.controller;

import com.jdbc_testing.backend.service.GeneralService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path="/login")
public class LoginController {

    @Autowired
    private GeneralService generalService;

//    @CrossOrigin
//    @GetMapping(path = "/login")
//    public List<Map<String, Object>> userLogin(
//            @RequestParam("Account") String account,
//            @RequestParam("Password") String password
//    ) {
//        return generalService.retrieveMultipleColumns(
//                "SELECT * FROM USERS WHERE USERS.Username = '" + account + "' " +
//                        "AND USERS.Password='" + password + "';"
//        );
//    }

    @CrossOrigin
    @PostMapping
    public List<Map<String, Object>> userLogin(
            @RequestBody Map<String, Object> body
    ) {
        return generalService.retrieveMultipleColumns(
                "SELECT * FROM USERS WHERE USERS.Username = '" + body.get("username") + "' " +
                        "AND USERS.Password='" + body.get("password") + "';"
        );
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
