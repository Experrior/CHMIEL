package com.backend.chmiel.rest;

import com.backend.chmiel.config.JwtService;
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
    private final JwtService jwtService;

    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8084"})
    @GetMapping("/getAll")
    public ResponseEntity<List<Project>> getSprints(){
        return ResponseEntity.ok(projectService.findAll());
    }

    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8084"})
    @GetMapping("/getProjectByProjectId/{project_id}")
    public ResponseEntity<Project> getProjectById(@PathVariable Integer project_id){
        return ResponseEntity.ok(projectService.findById(project_id));
    }

    @GetMapping("/getByUserId/{user_id}")
    public ResponseEntity<List<Project>> getSprintsByUserId(@RequestHeader("Authorization") String token){
        Integer id = jwtService.extractClaim(token.substring(7), (claims) -> claims.get("userId", Integer.class));
        return ResponseEntity.ok(projectService.getAllByUserId(id));
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
