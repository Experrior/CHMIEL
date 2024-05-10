package com.backend.chmiel.service;


import com.backend.chmiel.dao.SprintRepository;
import com.backend.chmiel.dao.TaskRepository;
import com.backend.chmiel.dao.UserRepository;
import com.backend.chmiel.entity.*;
import com.backend.chmiel.exception.TaskNotFoundException;
import com.backend.chmiel.payload.EditTaskRequest;
import com.backend.chmiel.payload.PostTaskRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    private final UserRepository userRepository;

    private final SprintRepository sprintRepository;

    @Autowired
    public TaskServiceImpl(TaskRepository taskRepository, UserRepository userRepository, SprintRepository sprintRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
        this.sprintRepository = sprintRepository;
    }


    @Override
    public Task getTaskById(Integer id) {
        Optional<Task> task = taskRepository.findById(id);
        return task.orElseGet(Task::new);
    }

    @Override
    public List<Task> getTasksByProjectId(Integer project_id) {
        return taskRepository.findTasksByProjectId(project_id);
    }

    @Override
    public List<Task> getTasksByAssigneeId(Integer assignee_id) {
        return taskRepository.findTasksByAssigneeId(assignee_id);
    }

    @Override
    public List<Task> getTasksByReporterId(Integer reporter_id) {
        return taskRepository.findTasksByReporterId(reporter_id);
    }

    @Override
    public List<Task> getTasksBySprintId(Integer sprint_id) {
        return taskRepository.findTasksBySprintId(sprint_id);
    }

    @Override
    public Map<String, Map<Integer, Integer>> getEpicsData(Integer project_id) {
        List<Object[]> data = taskRepository.getEpicsData(project_id);
        int minThird = -1;
        int maxThird = -1;
        for (Object[] item : data) {
            Integer third = (Integer) item[2];
            if (third != null) {
                if (minThird == -1 || third < minThird) {
                    minThird = third;
                }
                if (maxThird == -1 || third > maxThird) {
                    maxThird = third;
                }
            }
        }

        // Create mapping from min to max third element for each group
        Map<String, Map<Integer,  Integer>> groupedData = new HashMap<>();

        for (Object[] item : data) {
            String name = (String) item[0]; // First element is the name
            if (!groupedData.containsKey(name)) {
                groupedData.put(name, new HashMap<>()); // Initialize map if name doesn't exist
            }
            Map<Integer, Integer> mapping = groupedData.get(name);
            for (int i = minThird; i <= maxThird; i++) {
                if (!mapping.containsKey(i)) {
                    mapping.put(i, 0); // Initialize inner map if number doesn't exist
                }

                if (item[1].equals("closed") && item[2] != null && (Integer) item[2] == i){
                    mapping.replace(i, mapping.get(i)+1);
                }

            }
        }

    return groupedData;
    }

    @Override
    public Task editTask(EditTaskRequest editTaskRequest) {
        Task task = taskRepository.findById(editTaskRequest.getId()).orElseThrow(() -> new UsernameNotFoundException("Task not found"));

        if (editTaskRequest.getName() != null){
            task.setName(editTaskRequest.getName());
        }
        if (editTaskRequest.getStatus() != null){
            task.setStatus(editTaskRequest.getStatus());
        }
        if (editTaskRequest.getAssigneeId() != null){
            User user = userRepository.findById(editTaskRequest.getAssigneeId()).orElseThrow(() -> new UsernameNotFoundException("User not found"));
            task.setAssignee(user);
        }
        if (editTaskRequest.getSprintId() != null){
            Sprint sprint = sprintRepository.findById(editTaskRequest.getSprintId()).orElseThrow(() -> new UsernameNotFoundException(String.valueOf(editTaskRequest.getSprintId())));
            task.setSprint(sprint);
        }
        if (editTaskRequest.getDescription() != null){
          task.setDescription(editTaskRequest.getDescription());
        }

        return taskRepository.save(task);

    }


    @Override
    public void removeById(Integer id) {
        Task task = taskRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("Task not found"));
        taskRepository.delete(task);
    }

    @Override
    public Task createTask(PostTaskRequest postTaskRequest, Integer reporterId) throws TaskNotFoundException {

        Optional<User> assignee = Optional.empty();
        if (postTaskRequest.getAssigneeId() != null){
            assignee = userRepository.findById(postTaskRequest.getAssigneeId());
        }
        Optional<Sprint> sprint = Optional.empty();
        if (postTaskRequest.getSprintId() != null){
            sprint = sprintRepository.findById(postTaskRequest.getSprintId());
        }

        User reporter = userRepository.findById(reporterId).orElseThrow(() -> new UsernameNotFoundException("User not found"));


        Task newTask = Task.builder()
                .projectId(postTaskRequest.getProjectId())
                .reporter(reporter)
                .description(postTaskRequest.getDescription())
                .name(postTaskRequest.getName())
                .status(postTaskRequest.getStatus())
                .isEpic(postTaskRequest.isEpic())
                .build();

        if (postTaskRequest.getInEpic() != null){
            Task epic = taskRepository.findById(postTaskRequest.getInEpic()).orElseThrow(() -> new TaskNotFoundException(String.valueOf(postTaskRequest.getInEpic())));
            newTask.setInEpic(epic);
        }
        if (assignee.isPresent()) {newTask.setAssignee(assignee.get());}
        if (!postTaskRequest.isEpic()){
            if (sprint.isPresent()) {newTask.setSprint(sprint.get());}
        }

        if (postTaskRequest.getTimeEstimate() != null) {newTask.setTimeEstimate(postTaskRequest.getTimeEstimate());}

        return taskRepository.save(newTask);
    }
}
