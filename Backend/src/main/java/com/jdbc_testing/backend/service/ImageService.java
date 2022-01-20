package com.jdbc_testing.backend.service;

import com.jdbc_testing.backend.repository.GeneralRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
@Service
public class ImageService {
    @Autowired
    private GeneralRepository generalRepository;

    public List<Map<String, Object>> getImagesByAnimal(int animalId){
        String mySQLQuery = "SELECT * FROM IMAGES WHERE AnimalID=" + animalId + ";";
        return generalRepository.retrieveMultipleColumns(mySQLQuery);
    }

    public int addImage(Map<String, Object>body){
        String mySQLQuery = "INSERT INTO IMAGES(Date, FileLocation, UserID, AnimalID) VALUES (" +
                "'" + body.get("date") + "', '" + body.get("image")+ "', " +
                body.get("userId") + ", " + body.get("animalId")  + ");";
        return generalRepository.update(mySQLQuery);
    }
}
