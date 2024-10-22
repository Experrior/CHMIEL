package com.backend.chmiel.service;

import com.backend.chmiel.entity.Sprint;
import com.backend.chmiel.dto.EditSprintRequest;
import com.backend.chmiel.dto.PostSprintRequest;

import java.util.List;

public interface SprintService {
    List<Sprint> findAll();

    List<Sprint> findAllByProjectId(Integer id);


    List<Sprint> findAllByStartTimeAfterOrderByStartTimeAsc(String timestamp);

    List<Sprint> findAllByStopTimeBeforeOrderByStopTimeAsc(String timestamp);

    Sprint createSprint(PostSprintRequest postSprintRequest);

    void deleteSprintById(Integer id);

    Sprint updateSprintById(Integer id, EditSprintRequest editSprintRequest);

    Object getSprintsCompletionData(Integer projectId);

    Sprint getCurrentSprint(Integer projectId);
}
