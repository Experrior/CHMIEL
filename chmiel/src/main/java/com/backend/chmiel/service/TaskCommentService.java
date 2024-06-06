package com.backend.chmiel.service;


import com.backend.chmiel.entity.TaskComment;
import com.backend.chmiel.dto.PostTaskCommentRequest;

import java.util.List;

public interface TaskCommentService {


    List<TaskComment> findAllByTaskId(Integer id);

//    TaskComment removeById(Integer id);
    TaskComment editTaskCommentById(Integer id, String message);

    void removeById(Integer id);

    TaskComment createTaskComment(PostTaskCommentRequest postTaskCommentRequest);
}
