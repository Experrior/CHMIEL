package com.backend.chmiel.service;


import com.backend.chmiel.entity.Task;
import com.backend.chmiel.exception.TaskCommentNotFoundException;
import com.backend.chmiel.payload.PostTaskCommentRequest;
import com.backend.chmiel.payload.PostTaskRequest;

import java.util.List;
import java.util.Optional;

public interface TaskService {

    Task getTaskById(Integer id);

    List<Task> getTasksByProjectId(Integer project_id);

    List<Task> getTasksByAssigneeId(Integer assignee_id);

    List<Task> getTasksByReporterId(Integer reporter_id);

    List<Task> getTasksBySprintId(Integer sprint_id);


    Task editTaskCommentById(Integer id, String name, String description);

    void removeById(Integer id);

    Task createTask(PostTaskRequest postTaskRequest, Integer reportedId);
}
