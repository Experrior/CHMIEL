package com.backend.chmiel.service;


import com.backend.chmiel.dao.SprintRepository;
import com.backend.chmiel.dao.TaskRepository;
import com.backend.chmiel.dao.UserRepository;
import com.backend.chmiel.entity.*;
import com.backend.chmiel.exception.TaskNotFoundException;
import com.backend.chmiel.payload.EditTaskRequest;
import com.backend.chmiel.payload.PostTaskRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
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
        int minThird = 0;
        int maxThird = 0;
        for (Object[] item : data) {
            Integer third = (Integer) item[2];
            if (third != null) {
                if (minThird == 0 || third < minThird) {
                    minThird = third;
                }
                if (maxThird == 0 || third > maxThird) {
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
                .isEpic(postTaskRequest.isEpic())
                .build();
        if (postTaskRequest.getStatus() != null){
            newTask.setStatus(postTaskRequest.getStatus());
        }else{
            newTask.setStatus(Status.backlog);
        }
        if (postTaskRequest.getInEpic() != null){
            Task epic = taskRepository.findById(postTaskRequest.getInEpic()).orElseThrow(() -> new TaskNotFoundException(String.valueOf(postTaskRequest.getInEpic())));
            newTask.setInEpic(epic);
        }
        assignee.ifPresent(newTask::setAssignee);
        if (!postTaskRequest.isEpic()){
            sprint.ifPresent(newTask::setSprint);
        }

        if (postTaskRequest.getTimeEstimate() != null) {newTask.setTimeEstimate(postTaskRequest.getTimeEstimate());}

        return taskRepository.save(newTask);
    }

//    @Override
//    public List<Task> getFilteredTasks(Status status, Integer assigneeId, Integer sprintId) {
//        Task taskTemplate = new Task();
//        if (status != null) {
//            taskTemplate.setStatus(status);
//        }
//        if (assigneeId != null && assigneeId != -1) {
//            User user = userRepository.findById(assigneeId).orElseThrow(() -> new RuntimeException("No user found in database"));
//            taskTemplate.setAssignee(user);
//        }
//
//        if (sprintId != null) {
//            Sprint sprint = sprintRepository.findById(sprintId).orElseThrow(() -> new RuntimeException("No sprint found in database"));
//            taskTemplate.setSprint(sprint);
//        }
//        return taskRepository.findAll(Example.of(taskTemplate));
//    }

    public List<Task> getFilteredTasks(Status status, Integer assigneeId, Integer sprintId) {
        Specification<Task> spec = Specification.where(null);

        if (status != null) {
            spec = spec.and(hasStatus(status));
        }
        if (assigneeId != null) {
            User user = assigneeId == -1 ? null : userRepository.findById(assigneeId).orElse(null);
            spec = spec.and(hasAssignee(user));
        }
        if (sprintId != null) {
            Sprint sprint = sprintRepository.findById(sprintId).orElse(null);
            spec = spec.and(inSprint(sprint));
        }

        return taskRepository.findAll(spec);
    }

    public static Specification<Task> hasAssignee(User user) {
        return (root, query, criteriaBuilder) -> {
            if (user == null) {
                return criteriaBuilder.isNull(root.get("assignee"));
            } else {
                return criteriaBuilder.equal(root.get("assignee"), user);
            }
        };
    }

    public static Specification<Task> hasStatus(Status status) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("status"), status);
    }

    public static Specification<Task> inSprint(Sprint sprint) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("sprint"), sprint);
    }


}
