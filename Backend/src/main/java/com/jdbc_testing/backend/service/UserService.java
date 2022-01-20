package com.jdbc_testing.backend.service;

import com.jdbc_testing.backend.repository.GeneralRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class UserService {
    @Autowired
    private GeneralRepository generalRepository;

    public int suspendUser(int userId){
        String mySQLQuery = "UPDATE USERS SET Banned=1 where UserId= " + userId +";";
        return generalRepository.update(mySQLQuery);
    }

    public int unsuspendUser(int userId){
        String mySQLQuery = "UPDATE USERS SET Banned=0 where UserId= " + userId +";";
        return generalRepository.update(mySQLQuery);
    }

    public List<Map<String, Object>>  students(){
        String mySQLQuery ="Select * FROM USERS WHERE UserType = 'student';";
        return generalRepository.retrieveMultipleColumns(mySQLQuery);
    }


}
