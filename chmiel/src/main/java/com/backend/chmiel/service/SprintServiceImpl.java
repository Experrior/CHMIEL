package com.backend.chmiel.service;

import com.backend.chmiel.dao.SprintRepository;
import com.backend.chmiel.entity.Sprint;
import com.backend.chmiel.payload.EditSprintRequest;
import com.backend.chmiel.payload.PostSprintRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

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
        newSprint = sprintRepository.save(newSprint);
        newSprint.setSprintName("Sprint " + newSprint.getId());
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
        } else sprint.setStartTime(null);

        if (editSprintRequest.getStopTime() != null) {
            sprint.setStopTime(editSprintRequest.getStopTime());
        } else sprint.setStopTime(null);

        if (editSprintRequest.getIsStarted() != null) sprint.setStarted(editSprintRequest.getIsStarted());
        if (editSprintRequest.getIsFinished() != null) sprint.setFinished(editSprintRequest.getIsFinished());
        return sprintRepository.save(sprint);
    }

}
