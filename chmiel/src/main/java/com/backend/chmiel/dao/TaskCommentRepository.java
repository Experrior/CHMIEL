package com.backend.chmiel.dao;

import com.backend.chmiel.entity.Task;
import com.backend.chmiel.entity.TaskComment;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskCommentRepository extends JpaRepository<TaskComment, Integer> {
    
    List<TaskComment> findAllByTaskId(Integer taskId);
    
}
