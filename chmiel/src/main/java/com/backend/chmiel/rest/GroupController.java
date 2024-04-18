package com.backend.chmiel.rest;

import com.backend.chmiel.entity.Group;
import com.backend.chmiel.service.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/group")
@RequiredArgsConstructor
public class GroupController {
    private final GroupService groupService;

    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8084"})

    @GetMapping("/getAll")
    public ResponseEntity<List<Group>> getGroups(){
        return ResponseEntity.ok(groupService.findAll());
    }

    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8084"})
    @GetMapping("/getById/{id}")
    public ResponseEntity<Optional<Group>> getGroupById(@RequestParam Integer id){
        return ResponseEntity.ok(groupService.findById(id));
    }

    @DeleteMapping("/delete")
    public void deleteTaskComment(@RequestParam Integer id){
        groupService.removeById(id);
    }





}
