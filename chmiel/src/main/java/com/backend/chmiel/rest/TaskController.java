package com.backend.chmiel.rest;


import com.backend.chmiel.config.JwtService;
import com.backend.chmiel.entity.Status;
import com.backend.chmiel.entity.Task;
import com.backend.chmiel.exception.TaskNotFoundException;
import com.backend.chmiel.dto.EditTaskRequest;
import com.backend.chmiel.dto.PostTaskRequest;
import com.backend.chmiel.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/task")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;
    private final JwtService jwtService;

    @GetMapping("/getById/{task_id}")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8084"})
    public ResponseEntity<Task> getTaskByTaskId(@PathVariable Integer task_id){
        return ResponseEntity.ok(taskService.getTaskById(task_id));
    }

    @GetMapping("/getTasksByAssigneeId/{assignee_id}")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8084"})
    public ResponseEntity<List<Task>> getTaskById(@PathVariable Integer assignee_id){
        return ResponseEntity.ok(taskService.getTasksByAssigneeId(assignee_id));
    }

    @GetMapping("/getTasksBySprintId/{sprint_id}")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8084"})
    public ResponseEntity<List<Task>> getTasksBySprintId(@PathVariable Integer sprint_id) {
        return ResponseEntity.ok(taskService.getTasksBySprintId(sprint_id));
    }

    @GetMapping("/getTasksByReporterId/{reporter_id}")
    public ResponseEntity<List<Task>> getTasksByReporterId(@PathVariable Integer reporter_id) {
        return ResponseEntity.ok(taskService.getTasksByReporterId(reporter_id));
    }

    @GetMapping("/getTasksByProjectId/{project_id}")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8084"})
    public ResponseEntity<List<Task>> getTasksByProjectId(@PathVariable Integer project_id) {
        return ResponseEntity.ok(taskService.getTasksByProjectId(project_id));
    }

    @GetMapping("/getEpicsData/{project_id}")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8084"})
    public ResponseEntity<Map<String, Map<Integer, Integer>>> getEpicsData(@PathVariable Integer project_id) {
        return ResponseEntity.ok(taskService.getEpicsData(project_id));
    }

    @GetMapping("/getFilteredTasks")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8084"})
    public ResponseEntity<List<Task>> getFilteredTasks(@RequestParam(required = false) Integer projectId, @RequestParam(required = false) Status status, @RequestParam(required = false) Integer assigneeId, @RequestParam(required = false) Integer sprintId){
        return ResponseEntity.ok(taskService.getFilteredTasks(projectId, status, assigneeId, sprintId));
    }

    @PutMapping("/update")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8084"})
    public ResponseEntity<Optional<Task>> putTaskById(@RequestBody EditTaskRequest editTaskRequest){
        return ResponseEntity.ok(Optional.ofNullable(taskService.editTask(editTaskRequest)));
    }

    @DeleteMapping("/delete/{id}")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8084"})
    public void deleteTask(@PathVariable Integer id){
        taskService.removeById(id);
    }


    @PostMapping("/create")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8084"})
    public Task createTask(@RequestHeader("Authorization") String token, @RequestBody PostTaskRequest postTaskRequest)  {
        Integer reporterId = jwtService.extractClaim(token.substring(7), (claims) -> claims.get("userId", Integer.class));

        try{
            Task output = taskService.createTask(postTaskRequest, reporterId);
            return output;
//            return output.getInEpic();
        }catch (TaskNotFoundException e){
            return Task.builder()
                    .description(e.toString())
                    .build();
        }
    }

}
