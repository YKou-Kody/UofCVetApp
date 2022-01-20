package com.jdbc_testing.backend.service;

import com.jdbc_testing.backend.repository.GeneralRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;
@Service
public class AnimalCommentService {
    @Autowired
    private GeneralRepository generalRepository;

    public int addComment(Map<String, Object> body){
        String mySQLQuery = "INSERT INTO ANIMALCOMMENT(UserID, AnimalID, Date, Description) VALUES" +
                "(" + body.get("userId") +"," + body.get("animalId") + ",'" + body.get("date") + "', '" +
                body.get("description") + "');";

        return generalRepository.update(mySQLQuery);

    }
}
