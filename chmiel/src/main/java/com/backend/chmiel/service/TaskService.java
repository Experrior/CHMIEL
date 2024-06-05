package com.backend.chmiel.service;


import com.backend.chmiel.entity.Status;
import com.backend.chmiel.entity.Task;
import com.backend.chmiel.exception.TaskNotFoundException;
import com.backend.chmiel.dto.EditTaskRequest;
import com.backend.chmiel.dto.PostTaskRequest;

import java.util.List;
import java.util.Map;

public interface TaskService {

    Task getTaskById(Integer id);

    List<Task> getTasksByProjectId(Integer project_id);

    List<Task> getTasksByAssigneeId(Integer assignee_id);

    List<Task> getTasksByReporterId(Integer reporter_id);

    List<Task> getTasksBySprintId(Integer sprint_id);

    Map<String, Map<Integer, Integer>> getEpicsData(Integer sprint_id);

    Task editTask(EditTaskRequest editTaskRequest);

    void removeById(Integer id);

    Task createTask(PostTaskRequest postTaskRequest, Integer reportedId) throws TaskNotFoundException;

    List<Task> getFilteredTasks(Status status, Integer assigneeId, Integer sprintId);
}
