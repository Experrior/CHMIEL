package com.backend.chmiel.service;

import com.backend.chmiel.dao.TaskCommentRepository;
import com.backend.chmiel.entity.TaskComment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskCommentServiceImpl implements TaskCommentService{
    private final TaskCommentRepository taskCommentRepository;

    @Autowired
    public TaskCommentServiceImpl(TaskCommentRepository taskCommentRepository){
        this.taskCommentRepository = taskCommentRepository;
    }

    @Override
    public List<TaskComment> findAll() {
        return taskCommentRepository.findAll();
    }
}
