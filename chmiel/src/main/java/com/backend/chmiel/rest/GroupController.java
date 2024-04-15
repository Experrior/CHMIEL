package com.backend.chmiel.rest;

import com.backend.chmiel.entity.Group;
import com.backend.chmiel.service.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/group")
@RequiredArgsConstructor
public class GroupController {
    private final GroupService groupService;

    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8084"})
    @GetMapping()
    public ResponseEntity<List<Group>> getGroups(){
        return ResponseEntity.ok(groupService.findAll());
    }
}
