package com.backend.chmiel.dao;

import com.backend.chmiel.entity.Group;
import com.backend.chmiel.entity.Sprint;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SprintRepository extends JpaRepository<Sprint, Integer> {
    
    Optional<Sprint> findBySprintNameAndGroupId(String sprintName, Integer groupId);

    List<Sprint> findAllByGroup(Group group);

    // sprints with a start time after a specified time
    List<Sprint> findAllByStartTimeAfterOrderByStartTimeAsc(Timestamp startTime);

    // sprints with a start time before a specified time
    List<Sprint> findAllByStopTimeBeforeOrderByStopTimeAsc(Timestamp stopTime);
    
}
