package com.backend.chmiel.service;

import com.backend.chmiel.entity.Task;
import com.backend.chmiel.entity.TaskComment;

import java.util.List;
import java.util.Optional;

public interface TaskCommentService {
    List<TaskComment> findAll();

    Optional<TaskComment> findById(Integer id);

    List<TaskComment> findAllByTaskId(Integer id);
}
