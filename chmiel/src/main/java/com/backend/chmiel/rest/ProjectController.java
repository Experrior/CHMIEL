package com.backend.chmiel.rest;

import com.backend.chmiel.config.JwtService;
import com.backend.chmiel.entity.Project;
import com.backend.chmiel.dto.PostProjectRequest;
import com.backend.chmiel.dto.PutProjectRequest;
import com.backend.chmiel.dto.PutProjectUserRequest;
import com.backend.chmiel.entity.User;
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


    @GetMapping("/getAll")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8084"})
    public ResponseEntity<List<Project>> getSprints(){
        return ResponseEntity.ok(projectService.findAll());
    }


    @GetMapping("/getProjectByProjectId/{project_id}")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8084"})
    public ResponseEntity<Project> getProjectById(@PathVariable Integer project_id){
        return ResponseEntity.ok(projectService.findById(project_id));
    }

    @GetMapping("/getAllUsers/{project_id}")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8084"})
    public List<User> getAllUsers(@PathVariable Integer project_id){
        return projectService.getAllUsers(project_id);
    }


    @GetMapping("/getByUserId")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8084"})
    public ResponseEntity<List<Project>> getProjectsByUserId(@RequestHeader("Authorization") String token){
        System.out.println(token);
        Integer id = jwtService.extractClaim(token.substring(7), (claims) -> claims.get("userId", Integer.class));
        System.out.println(id);
        return ResponseEntity.ok(projectService.getAllByUserId(id));
    }


    @PutMapping("/addUser")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8084"})
    public ResponseEntity<String> addUser(@RequestBody PutProjectUserRequest putProjectUserRequest){
        return ResponseEntity.ok(projectService.addUser(putProjectUserRequest));
    }

    @PutMapping("/editName")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8084"})
    public ResponseEntity<Project> editName(@RequestBody PutProjectRequest putProjectRequest){
        return ResponseEntity.ok(projectService.editName(putProjectRequest));
    }

    @PostMapping("/createProject")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8084"})
    public ResponseEntity<Project> getSprintsByUserId(@RequestHeader("Authorization") String token,@RequestBody String projectName){
        System.out.println(token);
        Integer id = jwtService.extractClaim(token.substring(7), (claims) -> claims.get("userId", Integer.class));
        return ResponseEntity.ok(projectService.createProject(id, projectName));
    }

    @DeleteMapping("/remove/{id}")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8084"})
    public Boolean removeProject(@PathVariable Integer id){
        return projectService.removeById(id);
    }


    @DeleteMapping("/removeUser")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8084"})
    public Project removeProject(@RequestParam Integer projectId, @RequestParam Integer userId){
        return projectService.removeUserById(projectId, userId);
    }



}
