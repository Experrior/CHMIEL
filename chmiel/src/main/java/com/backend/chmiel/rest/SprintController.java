package com.backend.chmiel.rest;

import com.backend.chmiel.entity.Sprint;
import com.backend.chmiel.service.SprintService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/sprint")
@RequiredArgsConstructor
public class SprintController {
    private final SprintService sprintService;

    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8084"})
    @GetMapping()
    public ResponseEntity<List<Sprint>> getSprints(){
        return ResponseEntity.ok(sprintService.findAll());
    }
}
