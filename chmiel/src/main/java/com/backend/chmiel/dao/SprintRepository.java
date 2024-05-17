package com.backend.chmiel.dao;

import com.backend.chmiel.entity.Sprint;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface SprintRepository extends JpaRepository<Sprint, Integer> {

    List<Sprint> findAllByProjectId(Integer project_id);

    List<Sprint> findAllByStartTimeAfterOrderByStartTimeAsc(Timestamp startTime);

    List<Sprint> findAllByStopTimeBeforeOrderByStopTimeAsc(Timestamp stopTime);

    @Transactional
    @Modifying
    @Query(value = "  UPDATE Sprints  SET starting_task_count = (  SELECT COUNT(id) FROM Tasks WHERE Tasks.sprint_id = Sprints.id  )  WHERE start_time < current_date  AND stop_time > current_date  AND starting_task_count IS NULL;", nativeQuery = true)
    void updateSprintsStartingTaskCount();

    @Transactional
    @Modifying
    @Query(value="  UPDATE Sprints  SET ending_task_count = (  SELECT COUNT(id)  FROM Tasks  WHERE Tasks.sprint_id = Sprints.id AND Tasks.status = 'closed'  )  WHERE stop_time < current_date  AND ending_task_count IS NULL;", nativeQuery = true)
    void updateSPrintsEndingTaskCount();
}

