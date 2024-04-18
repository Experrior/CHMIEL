package com.backend.chmiel.service;


import com.backend.chmiel.entity.TaskComment;
import com.backend.chmiel.exception.TaskCommentNotFoundException;
import com.backend.chmiel.payload.PostTaskCommentRequest;

import java.util.List;
import java.util.Optional;

public interface TaskCommentService {


    List<TaskComment> findAllByTaskId(Integer id);

//    TaskComment removeById(Integer id);
    TaskComment editTaskCommentById(Integer id, String message);

    void removeById(Integer id);

    TaskComment createTaskComment(PostTaskCommentRequest postTaskCommentRequest);
}
