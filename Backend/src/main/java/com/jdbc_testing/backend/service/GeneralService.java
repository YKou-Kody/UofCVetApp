package com.jdbc_testing.backend.service;

import com.jdbc_testing.backend.repository.GeneralRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class GeneralService {
    @Autowired
    private GeneralRepository generalRepository;


    //This method can be used for operations like post and etc..
    public int update(String query)//   String[] arguments
    {
        //use the arguments(assuming multiple) passed to write your sqlQuery;
        String mySQLQuery = "";
        //Usually there should be at least 1 row affected, let's say update/delete/create operations
        //if the numberOfRowsAffected is less than 1, there is likely something went wrong
        int numberOfRowsAffected = generalRepository.update(query);
        return numberOfRowsAffected;
    }


    //This method can be used to retrieve a SingleColumn and return result as a list of String.
    //columns name is not included in the returned, it is pure data.
    public List<String> retrieveSingleColumnAsStringList(String query)//(String[] arguments)
    {
        //use the arguments(assuming multiple) passed to write your sqlQuery;
        String mySQLQuery = "";
        List<String> queryResult = generalRepository.getSingleColumn(query);
        return queryResult;
    }

    //
    public List<Map<String, Object>> retrieveMultipleColumns(String mySQLQuery)
    {
        //use the arguments(assuming multiple) passed to write your sqlQuery;
        //String mySQLQuery = "";
        //for testing purpose you can try: "select P.FName, P.LName, A.BirthYear from participant as P, athlete as A where P.OlympicID = A.OlympicID and ( A.BirthYear = (select min(BirthYear) from athlete) or  A.BirthYear = (select max(BirthYear) from athlete));"
        List<Map<String, Object>> queryResults = generalRepository.retrieveMultipleColumns(mySQLQuery);
        return queryResults;
    }

}
