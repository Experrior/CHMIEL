package com.backend.chmiel.rest;

import com.backend.chmiel.entity.TaskComment;
import com.backend.chmiel.service.TaskCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/task-comment")
@RequiredArgsConstructor
public class TaskCommentController {
    private final TaskCommentService taskCommentService;

    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8084"})
    @GetMapping()
    public ResponseEntity<List<TaskComment>> getTaskComments(@RequestParam Integer task_id){
        return ResponseEntity.ok(taskCommentService.findAll());
    }
}
