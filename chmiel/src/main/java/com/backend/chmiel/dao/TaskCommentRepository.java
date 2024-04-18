package com.backend.chmiel.dao;

import com.backend.chmiel.entity.TaskComment;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskCommentRepository extends JpaRepository<TaskComment, Integer> {
    
    List<TaskComment> findAllByTaskId(Integer taskId);

    Optional<TaskComment> findTaskCommentById(Integer id);

    void deleteById(Integer id);

}
