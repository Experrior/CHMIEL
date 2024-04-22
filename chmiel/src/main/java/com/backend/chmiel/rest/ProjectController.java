package com.backend.chmiel.rest;

import com.backend.chmiel.entity.Project;
import com.backend.chmiel.payload.PostProjectRequest;
import com.backend.chmiel.payload.PutProjectUserRequest;
import com.backend.chmiel.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/project")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8084"})
    @GetMapping("/getAll")
    public ResponseEntity<List<Project>> getSprints(){
        return ResponseEntity.ok(projectService.findAll());
    }

    @GetMapping("/getByUserId/{user_id}")
    public ResponseEntity<List<Project>> getSprintsByUserId(@PathVariable Integer user_id){
        return ResponseEntity.ok(projectService.getAllByUserId(user_id));
    }

    @PostMapping("/createProject")
    public ResponseEntity<Project> getSprintsByUserId(@RequestBody PostProjectRequest postProjectRequest){
        return ResponseEntity.ok(projectService.createProject(postProjectRequest));
    }

    @PutMapping("/addUser")
    public ResponseEntity<String> addUser(@RequestBody PutProjectUserRequest putProjectUserRequest){
        return ResponseEntity.ok(projectService.addUser(putProjectUserRequest));
    }
    @DeleteMapping("/remove/{id}")
    public ResponseEntity<Integer> removeProject(@PathVariable Integer id){
        Integer output = projectService.removeById(id);
        if (output == 0) {
            return (ResponseEntity<Integer>) ResponseEntity.notFound();
        }else{
            return ResponseEntity.ok(output);
        }
    }




}
