package com.backend.chmiel.service;


import com.backend.chmiel.dao.SprintRepository;
import com.backend.chmiel.dao.TaskRepository;
import com.backend.chmiel.dao.UserRepository;
import com.backend.chmiel.entity.Sprint;
import com.backend.chmiel.entity.Status;
import com.backend.chmiel.entity.Task;
import com.backend.chmiel.entity.User;
import com.backend.chmiel.payload.PostTaskRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

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
    public Task editTaskCommentById(Integer id, String name, String description) {
        Optional<Task> task = taskRepository.findById(id);
//                .orElseThrow(() -> new TaskCommentNotFoundException("User not found"));
        if (task.isPresent()) {
            task.get().setName(name);
            task.get().setDescription(description);
            return task.get();
        }
        return new Task();
    }

    @Override
    public void removeById(Integer id) {

    }

    @Override
    public List<Task> createTask(PostTaskRequest postTaskRequest) {
        Optional<User> assignee = Optional.empty();
        if (postTaskRequest.getAssigneeId() != null){
            assignee = userRepository.findById(postTaskRequest.getAssigneeId());
        }
        Optional<Sprint> sprint = Optional.empty();
        if (postTaskRequest.getSprintId() != null){
            sprint = sprintRepository.findById(postTaskRequest.getSprintId());
        }
        Optional<User> reporter = userRepository.findById(postTaskRequest.getReporterId());
        //TODO add exception
        if (reporter.isPresent()){
            Task newTask = Task.builder()
                    .projectId(postTaskRequest.getProjectId())
                    .reporter(reporter.get())
                    .description(postTaskRequest.getDescription())
                    .name(postTaskRequest.getName())
                    .status(Status.backlog)
                    .build();

            if (assignee.isPresent()) {newTask.setAssignee(assignee.get());}
            if (sprint.isPresent()) {newTask.setSprint(sprint.get());}
            if (postTaskRequest.getTimeEstimate() != null) {newTask.setTimeEstimate(postTaskRequest.getTimeEstimate());}

            taskRepository.save(newTask);
//            return "success";
        }

//        return String.valueOf(postTaskRequest.getReporterId());
        return taskRepository.findTasksByProjectId(postTaskRequest.getProjectId());
    }
}
