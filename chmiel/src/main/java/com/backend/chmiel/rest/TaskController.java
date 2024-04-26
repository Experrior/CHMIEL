package com.backend.chmiel.rest;


import com.backend.chmiel.entity.Task;
import com.backend.chmiel.payload.PostTaskRequest;
import com.backend.chmiel.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/task")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;


    @GetMapping("/getById/{task_id}")
    public ResponseEntity<Task> getTaskByTaskId(@PathVariable Integer task_id){
        return ResponseEntity.ok(taskService.getTaskById(task_id));
    }

    @GetMapping("/getTasksByAssigneeId/{assignee_id}")
    public ResponseEntity<List<Task>> getTaskById(@PathVariable Integer assignee_id){
        return ResponseEntity.ok(taskService.getTasksByAssigneeId(assignee_id));
    }

    @GetMapping("/getTasksBySprintId/{sprint_id}")
    public ResponseEntity<List<Task>> getTasksBySprintId(@PathVariable Integer sprint_id) {
        return ResponseEntity.ok(taskService.getTasksBySprintId(sprint_id));
    }

    @GetMapping("/getTasksByReporterId/{reporter_id}")
    public ResponseEntity<List<Task>> getTasksByReporterId(@PathVariable Integer reporter_id) {
        return ResponseEntity.ok(taskService.getTasksByReporterId(reporter_id));
    }

    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8084"})
    @GetMapping("/getTasksByProjectId/{project_id}")
    public ResponseEntity<List<Task>> getTasksByProjectId(@PathVariable Integer project_id) {
        return ResponseEntity.ok(taskService.getTasksByProjectId(project_id));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Optional<Task>> putTaskCommentById(@PathVariable Integer id, @RequestBody String name, @RequestBody String description){
        return ResponseEntity.ok(Optional.ofNullable(taskService.editTaskCommentById(id, name, description)));
    }

    @DeleteMapping("/delete/{id}")
    public void deleteTaskComment(@PathVariable Integer id){
        taskService.removeById(id);
    }

    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8084"})
    @PostMapping("/create")
    public ResponseEntity<List<Task>> putTaskById(@RequestBody PostTaskRequest postTaskRequest){
        return ResponseEntity.ok(taskService.createTask(postTaskRequest));
    }


}
