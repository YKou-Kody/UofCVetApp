package com.jdbc_testing.backend.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Repository
public class GeneralRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    public List<String> getSingleColumn(String mySQLQuery)
    {
        List<String> queryOutput = new ArrayList<>();
        queryOutput.addAll(jdbcTemplate.queryForList(mySQLQuery,String.class));
        return queryOutput;
    }

    public List<Map<String, Object>> retrieveMultipleColumns(String mySQLQuery) {
        return jdbcTemplate.queryForList(mySQLQuery);
    }

    public int update(String mySQLQuery){
        return jdbcTemplate.update(mySQLQuery);
    }


}

