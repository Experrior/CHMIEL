package com.backend.chmiel.rest;

import com.backend.chmiel.entity.TaskComment;
import com.backend.chmiel.payload.PostTaskCommentRequest;
import com.backend.chmiel.service.TaskCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/task-comment")
@RequiredArgsConstructor
public class TaskCommentController {
    private final TaskCommentService taskCommentService;

//    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8084"})
    @GetMapping("/getByTaskId/{task_id}")
    public ResponseEntity<List<TaskComment>> getTaskCommentsByTaskId(@PathVariable Integer task_id){
        return ResponseEntity.ok(taskCommentService.findAllByTaskId(task_id));
    }

//    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8084"})
    @PutMapping("/update/{id}")
    public ResponseEntity<Optional<TaskComment>> putTaskCommentById(@PathVariable Integer id, @RequestBody String message){

        return ResponseEntity.ok(Optional.ofNullable(taskCommentService.editTaskCommentById(id, message)));
    }

//    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8084"})
    @DeleteMapping("/delete/{id}")
    public void deleteTaskComment(@PathVariable Integer id){
        taskCommentService.removeById(id);
    }

    @PostMapping("/create")
    public ResponseEntity<Optional<TaskComment>> putTaskCommentById(@RequestBody PostTaskCommentRequest postTaskCommentRequest){

        return ResponseEntity.ok(Optional.ofNullable(taskCommentService.createTaskComment(postTaskCommentRequest)));
    }

}
