package com.jdbc_testing.backend.service;

import com.jdbc_testing.backend.repository.GeneralRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class PrescriptionService {

    @Autowired
    private GeneralRepository generalRepository;

    public int newPrescription(Map<String, Object> body){
        String mySQLQuery = "INSERT INTO PRESCRIPTIONRECORDS (Initiator, AnimalID, RecordDate, Instructions, " +
                "DrugID, Dosage, Delivery_Method, RequestID, Comment) VALUES ("+ body.get("Initiator") +", "+
                body.get("AnimalID") +",'" + body.get("RecordDate") + "', " + body.get("Instructions") + ", " +
                body.get("DrugID") + ", '" + body.get("Dosage") + "', '" + body.get("Delivery_Method") + "', " +
                body.get("RequestID") + ", '" + body.get("Comment") +"');";
        return generalRepository.update(mySQLQuery);

    }

    public List<Map<String, Object>> getPrescriptionsByRequest(int requestId){
        String mySQLQuery = "SELECT * FROM vetapplication.prescriptionrecords LEFT JOIN DRUGS ON " +
                "PRESCRIPTIONRECORDS.DrugID = DRUGS.ID LEFT JOIN treatmentmethod ON prescriptionrecords.Instructions = " +
                "treatmentmethod.ID LEFT JOIN ANIMAL on prescriptionrecords.AnimalID = Animal.AnimalID\n" +
                "WHERE RequestID =" + requestId + ";";

        return generalRepository.retrieveMultipleColumns(mySQLQuery);

    }

    public List<Map<String, Object>> getPrescriptionsByAnimal(int animalId){
        String mySQLQuery = "SELECT * FROM vetapplication.prescriptionrecords LEFT JOIN DRUGS ON " +
                "PRESCRIPTIONRECORDS.DrugID = DRUGS.ID LEFT JOIN treatmentmethod ON prescriptionrecords.Instructions = " +
                "treatmentmethod.ID " +
                "WHERE PRESCRIPTIONRECORDS.AnimalID =" + animalId+ ";";

        return generalRepository.retrieveMultipleColumns(mySQLQuery);

    }

}
