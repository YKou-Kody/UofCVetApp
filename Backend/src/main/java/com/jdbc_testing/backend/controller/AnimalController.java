package com.jdbc_testing.backend.controller;

import com.jdbc_testing.backend.service.GeneralService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path="/animal")
public class AnimalController {

    @Autowired
    private GeneralService generalService;

    @CrossOrigin
    @GetMapping
    public List<Map<String, Object>> getAllAnimal() {
        return generalService.retrieveMultipleColumns("Select * from animal");
    }

    @CrossOrigin
    @GetMapping(path="{animalID}")
    public Map<String, Object> getOneAnimal(
        @PathVariable("animalID") int animalID){
       return generalService.retrieveMultipleColumns("Select * from animal where animalid=" + animalID).get(0);
    }
    @CrossOrigin
    @GetMapping(path="/id")
    public List<String> getAllId(){
        return generalService.retrieveSingleColumnAsStringList("Select animalID from animal");
    }
    //Put to be added maybe???
    @CrossOrigin
    @PostMapping()
    public int addAnimal(
            @RequestBody Map<String, Object> body
    ){
        return generalService.update("INSERT INTO ANIMAL (Species, Weight, TattooNum, AnimalName, City, BirthDate," +
                " Breed, Sex, RFID, Microchip, AnimalStatus, Draught_Meat_Diary, DistinguishingFeatures," +
                "Color, Image) VALUES" + "("  + "'"+ body.get("species") +"'"
                        +",' " + body.get("weight") +"', " + body.get("tattooNum")  +", " +  "'"+ body.get("animalName") +"'" +", " + "'" + body.get("city") +"',"+
                        "'"+ body.get("birthDate") +"'" +", " +  "'"+ body.get("breed") +"'"+
                        ", " +  "'"+ body.get("sex") +"'" +", " +  "'"+ body.get("rfid") +"'"+", " +  "'"+ body.get("microchip") +"'"+", " +  "'"+ body.get("animalStatus") +"'"+
                        ", " +  "'"+ body.get("draughtMeatDiary") +"'"+", " +  "'"+ body.get("features") +"'"+", " +  "'"+ body.get("color") +"'" + ",'" + body.get("image")+"'"+  ");"
                );

    }
    @CrossOrigin
    @PutMapping(path="{id}")
    public int updateAnimal(
            @RequestBody Map<String, Object> body,
            @PathVariable("id") int id
    ){

        return generalService.update("UPDATE ANIMAL SET " +
                "AnimalName= " +  "'" + body.get("animalName") +"',"+
                "Species=" + "'" + body.get("species") + "'," +
                "Weight='"  + body.get("weight") + "'," +
                "TattooNum="  + body.get("tattooNum") + "," +
                "City=" + "'" + body.get("city") + "'," +
                "BirthDate=" + "'" + body.get("birthDate")+ "'," +
                "Breed=" + "'" + body.get("breed") + "'," +
                "Sex=" + "'" + body.get("sex") + "'," +
                "RFID=" + "'" + body.get("rfid") + "'," +
                "Microchip=" + "'" + body.get("microchip") + "'," +
                "AnimalStatus=" + "'" + body.get("animalStatus") + "'," +
                "Draught_Meat_Diary=" + "'" + body.get("draughtMeatDiary") + "'," +
                "DistinguishingFeatures=" + "'" + body.get("features") + "'," +
                "Color=" + "'" + body.get("color") + "'" +"," +
                "Image=" +"'" + body.get("image")+"'"
                +"WHERE AnimalID = " + id
        );

    }
    @CrossOrigin
    @DeleteMapping(path="{id}")
    public int deleteAnimal(
            @PathVariable ("id") int id
    ){
        return generalService.update("DELETE FROM ANIMAL WHERE AnimalID=" + id);

    }









}
