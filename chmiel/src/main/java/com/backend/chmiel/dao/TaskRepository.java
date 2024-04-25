package com.backend.chmiel.dao;

import com.backend.chmiel.entity.Task;
import com.backend.chmiel.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Integer> {

    List<Task> findByAssignee(User assignee);

//   
    List<Task> findTasksByProjectId(Integer project_id);

    @Query(value="SELECT * FROM Tasks WHERE assignee_id = ?1", nativeQuery = true)
    List<Task> findTasksByAssigneeId(Integer assignee_id);

    List<Task> findTasksBySprintId(Integer project_id);

    @Query(value="SELECT * FROM Tasks WHERE reporter_id = ?1", nativeQuery = true)
    List<Task> findTasksByReporterId(Integer reporter_id);
}
