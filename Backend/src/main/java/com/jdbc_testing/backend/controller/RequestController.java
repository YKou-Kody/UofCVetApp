package com.jdbc_testing.backend.controller;

import com.jdbc_testing.backend.service.GeneralService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path="/request")
public class RequestController {

    @Autowired
    private GeneralService generalService;

    @CrossOrigin
    @GetMapping
    public List<Map<String, Object>> getAllRequest() {
        return generalService.retrieveMultipleColumns("SELECT RequestID, Initiator, Animal, Stage, " +
                "AnimalName, Name as InitiatorName, reason FROM TEACHINGREQUESTS LEFT JOIN ANIMAL ON " +
                "TEACHINGREQUESTS.Animal =ANIMAL.AnimalID LEFT JOIN USERS ON Initiator = USERS.UserID;");
    }

    @CrossOrigin
    @GetMapping(path="/stage/{stage}")
    public List<Map<String, Object>> getRequestByStage(
            @PathVariable("stage") int stage
    ){
        return generalService.retrieveMultipleColumns("SELECT RequestID, Initiator, Animal, Stage, " +
            "AnimalName, Name as InitiatorName, reason FROM TEACHINGREQUESTS LEFT JOIN ANIMAL ON " +
            "TEACHINGREQUESTS.Animal =ANIMAL.AnimalID LEFT JOIN USERS ON Initiator = USERS.UserID " +
            "WHERE STAGE = " +stage +";");
    }


    @CrossOrigin
    @GetMapping(path = "/user/{id}")
    public List<Map<String, Object>> getUserRequest(
            @PathVariable("id") int id
    ) {
        return generalService.retrieveMultipleColumns("SELECT RequestID, Initiator, Animal, Stage, " +
                "AnimalName, Name as InitiatorName, reason FROM TEACHINGREQUESTS LEFT JOIN ANIMAL ON " +
                "TEACHINGREQUESTS.Animal =ANIMAL.AnimalID LEFT JOIN USERS ON Initiator = USERS.UserID " +
                "WHERE Initiator = " +id +";");
    }

    @CrossOrigin
    @GetMapping(path="/unavailable")
    public List<String> getUnavailableAnimals(){
        return generalService.retrieveSingleColumnAsStringList("SELECT DISTINCT Animal from TEACHINGREQUESTS " +
                "where Stage!=3 and Stage !=4 and Stage !=5;");
    }



//
//    @CrossOrigin
//    @GetMapping(path="{stage}")
//    public List<Map<String, Object>> getOneAnimal(
//            @PathVariable("stage") int stage){
//        return generalService.retrieveMultipleColumns("Select * from requests where stage<" + stage);
//    }
//    @CrossOrigin
//    @GetMapping(path="/id")
//    public List<String> getAllId(){
//        return generalService.retrieveSingleColumnAsStringList("Select animalID from animal");
//    }
    //Put to be added maybe???

    @CrossOrigin
    @PostMapping
    public int postRequest(
            @RequestBody Map<String, Object> body)
    {
        return generalService.update(
                "INSERT INTO TEACHINGREQUESTS(Initiator, Animal, Stage, reason)" +
                        "VALUES(" + body.get("initiator")+ "," +body.get("animal") +"," + 0+", '" +
                        body.get("reason") + "');");
    }

    @CrossOrigin
    @DeleteMapping(path="{RequestID}")
    @ResponseBody
    public int delete(
            @PathVariable("RequestID") int RequestID
    ){
        return generalService.update("DELETE FROM TEACHINGREQUESTS WHERE RequestID=" + String.valueOf(RequestID));
    }

    @CrossOrigin
    @PutMapping(path="{RequestID}")
    @ResponseBody
    public int put(
            @PathVariable("RequestID") int requestID,
            @RequestParam("stage") int stage
    ){
        return generalService.update("UPDATE TEACHINGREQUESTS SET Stage =" + stage +" WHERE RequestID=" + String.valueOf(requestID));
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
