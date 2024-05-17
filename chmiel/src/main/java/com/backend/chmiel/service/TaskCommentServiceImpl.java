package com.backend.chmiel.service;

import com.backend.chmiel.dao.TaskCommentRepository;
import com.backend.chmiel.dao.UserRepository;
import com.backend.chmiel.entity.TaskComment;
import com.backend.chmiel.entity.User;
import com.backend.chmiel.exception.TaskCommentNotFoundException;
import com.backend.chmiel.payload.PostTaskCommentRequest;
import com.backend.chmiel.payload.UserDetailsResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskCommentServiceImpl implements TaskCommentService{
    private final TaskCommentRepository taskCommentRepository;
    private final UserRepository userRepository;

    @Autowired
    public TaskCommentServiceImpl(TaskCommentRepository taskCommentRepository, UserRepository userRepository){
        this.taskCommentRepository = taskCommentRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void removeById(Integer id) {
        taskCommentRepository.deleteById(id);
    }

    @Override
    public List<TaskComment> findAllByTaskId(Integer id) {
        return taskCommentRepository.findAllByTaskId(id);
    }
    @Override
    public TaskComment editTaskCommentById(Integer id, String message)  {
        Optional<TaskComment> taskComment = taskCommentRepository.findById(id);
//                .orElseThrow(() -> new TaskCommentNotFoundException("User not found"));
        if (taskComment.isPresent()) {
            taskComment.get().setMessage(message);
            taskCommentRepository.save(taskComment.get());
            return taskComment.get();
        }
        return new TaskComment();
    }

    @Override
    public TaskComment createTaskComment(PostTaskCommentRequest postTaskCommentRequest){
        User author = userRepository.findById(postTaskCommentRequest.getAuthorId()).orElseThrow(() -> new UsernameNotFoundException("Author not found"));
        return taskCommentRepository.save(TaskComment.builder()
                        .author(author)
                        .message(postTaskCommentRequest.getMessage())
                        .taskId(postTaskCommentRequest.getTaskId())
                .build());
    }

}
