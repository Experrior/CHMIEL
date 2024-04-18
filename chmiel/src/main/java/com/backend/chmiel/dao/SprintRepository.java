package com.backend.chmiel.dao;

import com.backend.chmiel.entity.Sprint;

import java.sql.Timestamp;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SprintRepository extends JpaRepository<Sprint, Integer> {

    List<Sprint> findAllByGroupId(Integer group_id);

    List<Sprint> findAllByStartTimeAfterOrderByStartTimeAsc(Timestamp startTime);

    List<Sprint> findAllByStopTimeBeforeOrderByStopTimeAsc(Timestamp stopTime);
}

