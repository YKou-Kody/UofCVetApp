package com.jdbc_testing.backend.service;

import com.jdbc_testing.backend.repository.GeneralRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class TreatmentService {
    @Autowired
    private GeneralRepository generalRepository;

    public List<Map<String, Object>> retrieveAllPrescriptions(){
        String mySQLQuery = "SELECT ID, Initiator, TREATMENTREQUESTS.AnimalID, Stage, AnimalName, Name as InitiatorName,\n" +
                " Request FROM TREATMENTREQUESTS LEFT JOIN ANIMAL ON TREATMENTREQUESTS.AnimalID =ANIMAL.AnimalID \n" +
                " LEFT JOIN USERS ON Initiator = USERS.UserID";
        return generalRepository.retrieveMultipleColumns(mySQLQuery);
    }

    public List<Map<String, Object>> retriveUserPrescriptions(int id){
        String mySQLQuery = "SELECT ID, Initiator, TREATMENTREQUESTS.AnimalID, Stage, AnimalName, Name as InitiatorName,\n" +
                " Request FROM TREATMENTREQUESTS LEFT JOIN ANIMAL ON TREATMENTREQUESTS.AnimalID =ANIMAL.AnimalID \n" +
                " LEFT JOIN USERS ON Initiator = USERS.UserID WHERE Initiator=" + id;
        return generalRepository.retrieveMultipleColumns(mySQLQuery);
    }

    public List<Map<String, Object>> retrieveToBePrescribed(){
        String mySQLQuery = "SELECT ID, Initiator, TREATMENTREQUESTS.AnimalID, Stage, AnimalName, Name as InitiatorName,\n" +
                " Request FROM TREATMENTREQUESTS LEFT JOIN ANIMAL ON TREATMENTREQUESTS.AnimalID =ANIMAL.AnimalID \n" +
                " LEFT JOIN USERS ON Initiator = USERS.UserID WHERE Stage = 0";
        return generalRepository.retrieveMultipleColumns(mySQLQuery);
    }

    public int postNewTreatmentRequest(Map<String, Object> body){
        String mySQLQuery = "INSERT INTO TREATMENTREQUESTS(Request, AnimalID, Initiator, Stage) VALUES('" +
                body.get("request") +"', " + body.get("animalID") + ", " + body.get("initiator") + ", 0);" ;
        return generalRepository.update(mySQLQuery);
    }

    public int completeTreatment(Map<String, Object> body, int requestId){
        String mySQLQuery = "UPDATE TREATMENTREQUESTS SET stage=1, ApproveBy =" + body.get("ApproveBy") + " WHERE" +
                " ID = " + requestId +";";
        return generalRepository.update(mySQLQuery);
    }




//    public List<Map<String, Object>> retrieveAllPrescriptions()
//    {
//        String mySQLQuery = "select * from Prescription;";
//        List<Map<String, Object>> queryResults = generalRepository.retrieveMultipleColumns(mySQLQuery);
//        return queryResults;
//    }
//
//    public List<Map<String, Object>> retrieveAllDiagnosis()
//    {
//        String mySQLQuery = "select * from Diagnosis;";
//        List<Map<String, Object>> queryResults = generalRepository.retrieveMultipleColumns(mySQLQuery);
//        return queryResults;
//    }
//
//    public List<Map<String, Object>> retrieveAllMedicalRecords()
//    {
//        String mySQLQuery = "select * from MedicalRecord;";
//        List<Map<String, Object>> queryResults = generalRepository.retrieveMultipleColumns(mySQLQuery);
//        return queryResults;
//    }
//
//    public List<Map<String, Object>> retrieveAllAlerts()
//    {
//        String mySQLQuery = "select * from Alert;";
//        List<Map<String, Object>> queryResults = generalRepository.retrieveMultipleColumns(mySQLQuery);
//        return queryResults;
//    }
//
//    public int add (Map<String, String> result)
//    {
//        String table = result.get("table");
//        String record = result.get("record");
//        String maxID = generalRepository.
//                getSingleColumn("SELECT MAX(ID) FROM "+ table+";").get(0);
//        String newID = String.valueOf(Integer.parseInt(maxID)+1);
//        String mySQLQuery = "INSERT INTO "+table+" (id, record) VALUES "+"("+"'"+newID+"'"+","+"'"+record+"';";
//        return this.generalRepository.update(mySQLQuery);
//    }
//
//    public int update(Map<String, String> result)
//    {
//        String table = result.get("table");
//        String id = result.get("ID");
//        String record = result.get("record");
//        String mySQLQuery ="UPDATE "+table+" SET record = "+ "'"+record+"'"+"where ID=" +"'"+id+"';";
//        return this.generalRepository.update(mySQLQuery);
//    }
//
//    public int delete(Map<String, String> result)
//    {
//        String table = result.get("table");
//        String id = result.get("ID");
//        String mySQLQuery = "Delete FROM "+table+" where id = "+"'"+id+"'";
//        return this.generalRepository.update(mySQLQuery);
//    }
}
