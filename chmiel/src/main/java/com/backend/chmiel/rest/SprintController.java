package com.backend.chmiel.rest;

import com.backend.chmiel.entity.Sprint;
import com.backend.chmiel.payload.PostSprintRequest;
import com.backend.chmiel.service.SprintService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sprint")
@RequiredArgsConstructor
public class SprintController {
    private final SprintService sprintService;

    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8084"})
    @GetMapping("/getAll")
    public ResponseEntity<List<Sprint>> getSprints(){
        return ResponseEntity.ok(sprintService.findAll());
    }

    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8084"})
    @GetMapping("/getByGroupId/{group_id}")
    public ResponseEntity<List<Sprint>> getSprintsByGroup(@PathVariable Integer group_id){
        return ResponseEntity.ok(sprintService.findAllByGroupId(group_id));
    }

    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8084"})
    @GetMapping("/getByStartTime")
    public ResponseEntity<List<Sprint>> getSprintsByStartTime(@RequestParam String timestamp){
        return ResponseEntity.ok(sprintService.findAllByStartTimeAfterOrderByStartTimeAsc(timestamp));
    }

    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8084"})
    @GetMapping("/getByStopTime")
    public ResponseEntity<List<Sprint>> getSprintsByStopTime(@RequestParam String timestamp){
        return ResponseEntity.ok(sprintService.findAllByStopTimeBeforeOrderByStopTimeAsc(timestamp));
    }

    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8084"})
    @PostMapping("/create")
    public ResponseEntity<Sprint> createSprint(@RequestBody PostSprintRequest postSprintRequest){
        return ResponseEntity.ok(sprintService.createSprint(postSprintRequest));
    }

}
