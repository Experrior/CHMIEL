package com.backend.chmiel.dao;

import com.backend.chmiel.entity.Group;
import com.backend.chmiel.entity.Sprint;

import java.sql.Timestamp;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SprintRepository extends JpaRepository<Sprint, Integer> {

    List<Sprint> findAllByGroup(Group group);

    List<Sprint> findAllByStartTimeAfterOrderByStartTimeAsc(Timestamp startTime);

    List<Sprint> findAllByStopTimeBeforeOrderByStopTimeAsc(Timestamp stopTime);
}