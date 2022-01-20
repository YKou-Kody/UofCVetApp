package com.jdbc_testing.backend.service;

import com.jdbc_testing.backend.repository.GeneralRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;
@Service
public class AnimalStatusService {

    @Autowired
    private GeneralRepository generalRepository;

    public int updateAnimalStatus(Map<String, Object> body){
        String mySQLQuery = "UPDATE ANIMAL SET AnimalStatus = '" +
                body.get("status") + "' WHERE AnimalID="+body.get("animalId") + ";";
        generalRepository.update(mySQLQuery);


        String mySQLQuery1 = "INSERT INTO ANIMALSTATUS(AnimalID, Date, Description, Location, Status) VALUES(" +
                        body.get("animalId") + ", '" + body.get("date") + "'," + "'" + body.get("description")+"',"
                + "'" + body.get("location") +"','"+
                        body.get("status") + "');";

        return generalRepository.update(mySQLQuery1);

    }

}
