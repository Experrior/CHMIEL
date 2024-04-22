package com.backend.chmiel.service;

import com.backend.chmiel.entity.Sprint;
import com.backend.chmiel.payload.PostSprintRequest;

import java.util.List;

public interface SprintService {
    List<Sprint> findAll();

    List<Sprint> findAllByProjectId(Integer id);


    List<Sprint> findAllByStartTimeAfterOrderByStartTimeAsc(String timestamp);

    List<Sprint> findAllByStopTimeBeforeOrderByStopTimeAsc(String timestamp);

    Sprint createSprint(PostSprintRequest postSprintRequest);
 }
