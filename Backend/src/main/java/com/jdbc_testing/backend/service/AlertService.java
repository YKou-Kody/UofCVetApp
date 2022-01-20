package com.jdbc_testing.backend.service;

import com.jdbc_testing.backend.repository.GeneralRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class AlertService {
    @Autowired
    private GeneralRepository generalRepository;

    public List<Map<String, Object>> getAlertByAnimal(int animalId){
        String mySQLQuery = "SELECT * FROM ALERT WHERE AnimalID=" + animalId +";";
        return generalRepository.retrieveMultipleColumns(mySQLQuery);

    }

    public int addExamResult(Map<String, Object> body){
        String mySQLQuery = "INSERT INTO ALERT(AnimalID, Date, Description, Severity) VALUES" +
                "(" + body.get("animalId") +",'" + body.get("date") + "','" + body.get("description") + "', " +
                body.get("severity") + ");";
        return generalRepository.update(mySQLQuery);

    }

}
