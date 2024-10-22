package com.backend.chmiel.service;

import com.backend.chmiel.dao.SprintRepository;
import com.backend.chmiel.entity.Sprint;
import com.backend.chmiel.dto.EditSprintRequest;
import com.backend.chmiel.dto.PostSprintRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.*;

@Service
public class SprintServiceImpl implements SprintService {
    private final SprintRepository sprintRepository;

    @Autowired
    public SprintServiceImpl(SprintRepository sprintRepository) {
        this.sprintRepository = sprintRepository;
    }

    @Override
    public List<Sprint> findAll() {
        return sprintRepository.findAll();
    }

    @Override
    public List<Sprint> findAllByProjectId(Integer project_id) {
        return sprintRepository.findAllByProjectId(project_id);
    }

    @Override
    public List<Sprint> findAllByStartTimeAfterOrderByStartTimeAsc(String timestamp) {
        return sprintRepository.findAllByStartTimeAfterOrderByStartTimeAsc(Timestamp.valueOf(timestamp));
    }

    @Override
    public List<Sprint> findAllByStopTimeBeforeOrderByStopTimeAsc(String timestamp) {
        return sprintRepository.findAllByStopTimeBeforeOrderByStopTimeAsc(Timestamp.valueOf(timestamp));
    }

//    @Override
//    public Sprint createSprint(PostSprintRequest postSprintRequest) {
//
//        Sprint newSprint = Sprint.builder()
//                .projectId(postSprintRequest.getProjectId())
//                .build();
//
//        if (postSprintRequest.getSprintName() != null){
//            newSprint.setSprintName(postSprintRequest.getSprintName());
//        }
//        if (postSprintRequest.getStartTime() != null){
//            newSprint.setStartTime(postSprintRequest.getStartTime());
//        }
//        if (postSprintRequest.getStopTime() != null){
//            newSprint.setStopTime(postSprintRequest.getStopTime());
//        }
//
//        return sprintRepository.save(newSprint);
//    }

    @Override
    public Sprint createSprint(PostSprintRequest postSprintRequest) {
        Sprint newSprint = Sprint.builder()
                .sprintName("Temporary Name")
                .projectId(postSprintRequest.getProjectId())
                .build();

        if (postSprintRequest.getSprintName() != null){
            newSprint.setSprintName(postSprintRequest.getSprintName());
        }
        if (postSprintRequest.getSprintName() != null){
            newSprint.setStartTime(postSprintRequest.getStartTime());
        }
        if (postSprintRequest.getSprintName() != null) {
            newSprint.setStopTime(postSprintRequest.getStopTime());
        }
        newSprint = sprintRepository.save(newSprint);

        return sprintRepository.save(newSprint);
    }

    @Override
    public void deleteSprintById(Integer id) {
        sprintRepository.deleteById(id);
    }

    @Override
    public Sprint updateSprintById(Integer id, EditSprintRequest editSprintRequest) {
        Sprint sprint = sprintRepository.findById(id).orElseThrow();

        if (editSprintRequest.getSprintName() != null) sprint.setSprintName(editSprintRequest.getSprintName());

        if (editSprintRequest.getStartTime() != null) {
            sprint.setStartTime(editSprintRequest.getStartTime());
        }

        if (editSprintRequest.getStopTime() != null) {
            sprint.setStopTime(editSprintRequest.getStopTime());
        }

        if (editSprintRequest.getIsStarted() != null) sprint.setStarted(editSprintRequest.getIsStarted());
        if (editSprintRequest.getIsFinished() != null) sprint.setFinished(editSprintRequest.getIsFinished());
        return sprintRepository.save(sprint);
    }

    @Override
    public Object getSprintsCompletionData(Integer projectId) {
        List<Sprint> sprints = sprintRepository.findAllByProjectId(projectId);

        Map<String, Object> sprintData = new HashMap<>();
        List<Integer> completedTasks = new ArrayList<>();
        List<Integer> unfinishedTasks = new ArrayList<>();
        List<String> categories = new ArrayList<>();

        // Populate series data and categories
        for (Sprint sprint : sprints) {
            if ((sprint.getStartingTaskCount() != null) && (sprint.getEndingTaskCount() != null)){

                int completed = sprint.getStartingTaskCount() - sprint.getEndingTaskCount();
                String sprintName = sprint.getSprintName();
                categories.add(sprintName);

                // Calculate completed tasks

                completedTasks.add(completed);

                // Unfinished tasks
                unfinishedTasks.add(sprint.getEndingTaskCount());
            }

        }

        // Add data to sprintData map
        sprintData.put("Completed tasks", completedTasks);
        sprintData.put("Unfinished tasks", unfinishedTasks);
        sprintData.put("categories1", categories);

        return sprintData;
    }

    @Override
    public Sprint getCurrentSprint(Integer projectId) {
        return sprintRepository.findCurrentSprint(projectId);
    }

}
