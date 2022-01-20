package com.jdbc_testing.backend.controller;

import com.jdbc_testing.backend.service.GeneralService;
import com.jdbc_testing.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path="/manageuser")
public class UsersController {


    @Autowired
    private GeneralService generalService;
    @Autowired
    private UserService userService;

    @CrossOrigin
    @GetMapping
    public List<Map<String, Object>> check() {
        return generalService.retrieveMultipleColumns("Select * from Users");
    }
    @CrossOrigin
    @GetMapping(path="/usernamecheck")
    public List<String>  checkUsername(){
        return generalService.retrieveSingleColumnAsStringList("Select Username from Users");
    }

    @CrossOrigin
    @GetMapping(path = "{account}")
    public List<Map<String, Object>> getOneUser(
            @RequestParam("Account") String account
    ) {
        return generalService.retrieveMultipleColumns(
                "SELECT ID, Username, UserType, Email FROM Users WHERE Users.Username ="  + "'"+ account +"'"  +";");
    }

    //Used to register users
    @CrossOrigin
    @PostMapping
    public int addUser(
            @RequestBody Map<String, Object> body
        )

    {
        return generalService.update(
                "INSERT INTO Users(Username, password,UserType,Email,  Activation_Date, Name)" +
                        "VALUES" + "("  + "'"+ body.get("username") +"'" + ", " + "'"+ body.get("password") +"'" +", " +
                        "'"+ body.get("userType") +"'"  +", " +  "'"+ body.get("email") +"'" + ", " +  "'"+ body.get("date") +"',"
                        +"'" + body.get("fullname") +"'"+");");
    }

//    @CrossOrigin
//    @PutMapping(path="{ID}")
//    public int updateUser(
//            @PathVariable("ID") int ID,
//            @RequestParam ("Username") String username,
//            @RequestParam("password") int password,
//            @RequestParam ("UserType") int userType,
//            @RequestParam ("Email") String email,
//            @RequestParam ( "Activation_Date") String activationDate
//    ){
//
//        return generalService.update("UPDATE Users SET " +
//                "Username=" + "'" + username + "'," +
//                "password="  + "'" + password + "'," +
//                "UserType="  + "'" + userType + "'," +
//                "Email=" + "'" + email + "'," +
//                "Activation_Date=" + "'" +  activationDate + "'"
//                +" WHERE  ID= " + ID +";"
//        );
//
//    }

    @CrossOrigin
    @DeleteMapping(path="{ID}")
    public int deleteUser(
            @PathVariable("ID") int ID
    ){
        return generalService.update("DELETE FROM Users WHERE ID=" + ID +";"
        );

    }

    @CrossOrigin
    @PutMapping(path="/suspend/{userId}")
    public int suspendUser(
            @PathVariable("userId") int userId
    ){
        return userService.suspendUser(userId);

    }

    @CrossOrigin
    @PutMapping(path="/unsuspend/{userId}")
    public int unsuspendUser(
            @PathVariable("userId") int userId
    ){
        return userService.unsuspendUser(userId);

    }

    @CrossOrigin
    @GetMapping(path="student")
    public List<Map<String, Object>> getStudents(){
        return userService.students();
    }





}