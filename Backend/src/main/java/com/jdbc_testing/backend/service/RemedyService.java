package com.jdbc_testing.backend.service;

import com.jdbc_testing.backend.repository.GeneralRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class RemedyService {
    @Autowired
    private GeneralRepository generalRepository;

    public List<Map<String, Object>> getAllRemedies(){
        String mySQLQuery = "SELECT * FROM TREATMENTMETHOD;";
        return generalRepository.retrieveMultipleColumns(mySQLQuery);
    }
}
