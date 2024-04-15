package com.backend.chmiel.service;

import com.backend.chmiel.entity.TaskComment;

import java.util.List;

public interface TaskCommentService {
    List<TaskComment> findAll();
}
