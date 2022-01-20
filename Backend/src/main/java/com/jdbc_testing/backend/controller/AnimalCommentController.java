package com.jdbc_testing.backend.controller;

import com.jdbc_testing.backend.service.AnimalCommentService;
import com.jdbc_testing.backend.service.GeneralService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path="/comment")
public class AnimalCommentController {
    @Autowired
    private GeneralService generalService;

    @Autowired
    private AnimalCommentService animalCommentService;

    @CrossOrigin
    @GetMapping(path="{id}")
    public List<Map<String, Object>> getAnimalComments(
            @PathVariable("id") int id
    ){
        return generalService.retrieveMultipleColumns("Select * from ANIMALCOMMENT WHERE AnimalID=" + id );
    }

    @PostMapping
    @CrossOrigin
    public int addComment(
            @RequestBody Map<String, Object> body
    ){
        return animalCommentService.addComment(body);
    }

//    @CrossOrigin
//    @DeleteMapping(path="{id}")
//    public int deleteAnimalStatus(
//            @PathVariable("id") int id
//    ){
//        return generalService.update("DELETE FROM ANIMALCOMMENT WHERE CommentID=" + id);
//    }

}
