package com.backend.chmiel.rest;

import com.backend.chmiel.entity.Sprint;
import com.backend.chmiel.dto.EditSprintRequest;
import com.backend.chmiel.dto.PostSprintRequest;
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


    @GetMapping("/getAll")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8084"})
    public ResponseEntity<List<Sprint>> getSprints(){
        return ResponseEntity.ok(sprintService.findAll());
    }


    @GetMapping("/getByProjectId/{project_id}")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8084"})
    public ResponseEntity<List<Sprint>> getSprintsByGroup(@PathVariable Integer project_id){
        return ResponseEntity.ok(sprintService.findAllByProjectId(project_id));
    }


    @GetMapping("/getSprintsStartingAfter")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8084"})
    public ResponseEntity<List<Sprint>> getSprintsByStartTime(@RequestParam String timestamp){
        return ResponseEntity.ok(sprintService.findAllByStartTimeAfterOrderByStartTimeAsc(timestamp));
    }


    @GetMapping("/getSprintsFinishedBefore")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8084"})
    public ResponseEntity<List<Sprint>> getSprintsByStopTime(@RequestParam String timestamp){
        return ResponseEntity.ok(sprintService.findAllByStopTimeBeforeOrderByStopTimeAsc(timestamp));
    }


    @GetMapping("/getSprintsCompletionData/{projectId}")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8084"})
    public ResponseEntity<Object> getSprintsCompletionData(@PathVariable Integer projectId){
        return ResponseEntity.ok(sprintService.getSprintsCompletionData(projectId));
    }


    @GetMapping("/getCurrentSprint/{projectId}")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8084"})
    public ResponseEntity<Sprint> getCurrentSprint(@PathVariable Integer projectId){
        return ResponseEntity.ok(sprintService.getCurrentSprint(projectId));
    }


    @PostMapping("/create")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8084"})
    public ResponseEntity<Sprint> createSprint(@RequestBody PostSprintRequest postSprintRequest){
        return ResponseEntity.ok(sprintService.createSprint(postSprintRequest));
    }


    @DeleteMapping("/delete/{sprintId}")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8084"})
    public void deleteSprint(@PathVariable Integer sprintId){
        sprintService.deleteSprintById(sprintId);
    }


    @PatchMapping("/edit/{id}")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8084"})
    public ResponseEntity<Sprint> updateSprint(@PathVariable Integer id, @RequestBody EditSprintRequest request) {
        return ResponseEntity.ok(sprintService.updateSprintById(id, request));
    }
}
