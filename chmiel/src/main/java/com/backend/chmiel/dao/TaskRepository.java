package com.backend.chmiel.dao;

import com.backend.chmiel.entity.Task;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Integer>, JpaSpecificationExecutor<Task> {

    List<Task> findTasksByProjectId(Integer project_id);

    @Query(value="SELECT * FROM Tasks WHERE assignee_id = ?1", nativeQuery = true)
    List<Task> findTasksByAssigneeId(Integer assignee_id);

    List<Task> findTasksBySprintId(Integer project_id);

    @Query(value="SELECT * FROM Tasks WHERE reporter_id = ?1", nativeQuery = true)
    List<Task> findTasksByReporterId(Integer reporter_id);

    @Query(value = "SELECT e.name, t.status, t.sprint_id FROM tasks t JOIN tasks e ON t.in_epic = e.id WHERE e.is_epic = true AND e.project_id = ?1", nativeQuery = true)
    List<Object[]> getEpicsData(Integer project_id);
}
