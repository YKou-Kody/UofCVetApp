package com.jdbc_testing.backend.service;

import com.jdbc_testing.backend.repository.GeneralRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ExamHistoryService {
    @Autowired
    private GeneralRepository generalRepository;

    public List<Map<String, Object>> getExamByAnimal(int animalId){
        String mySQLQuery = "SELECT * FROM vetapplication.examhistory LEFT " +
                "JOIN USERS On EXAMHISTORY.UserID = USERS.UserId WHERE AnimalID=" + animalId + ";";
        return generalRepository.retrieveMultipleColumns(mySQLQuery);
    }

    public int postExamResult(Map<String, Object>body){
        String mySQLQuery = "INSERT INTO EXAMHISTORY(Date, Measurement, MeasurementValue, UserID, AnimalID) VALUES (" +
                "'" + body.get("date") + "', '" + body.get("measurement") + "', '" + body.get("measurementValue") + "', " +
                body.get("userId") + ", " + body.get("animalId")  + ");";
        return generalRepository.update(mySQLQuery);
    }
}
