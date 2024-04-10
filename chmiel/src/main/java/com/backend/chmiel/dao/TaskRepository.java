package com.backend.chmiel.dao;

import com.backend.chmiel.entity.Task;
import com.backend.chmiel.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Integer> {

    List<Task> findByAssignee(User assignee);
}
