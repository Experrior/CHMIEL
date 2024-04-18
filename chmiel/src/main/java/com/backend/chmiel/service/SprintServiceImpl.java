package com.backend.chmiel.service;

import com.backend.chmiel.dao.SprintRepository;
import com.backend.chmiel.entity.Sprint;
import com.backend.chmiel.payload.PostSprintRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
public class SprintServiceImpl implements SprintService{
    private final SprintRepository sprintRepository;

    @Autowired
    public SprintServiceImpl(SprintRepository sprintRepository){
        this.sprintRepository = sprintRepository;
    }

    @Override
    public List<Sprint> findAll() {
        return sprintRepository.findAll();
    }

    @Override
    public List<Sprint> findAllByGroupId(Integer group_id) {
        return sprintRepository.findAllByGroupId(group_id);
    }

    @Override
    public List<Sprint> findAllByStartTimeAfterOrderByStartTimeAsc(String timestamp) {
        return sprintRepository.findAllByStartTimeAfterOrderByStartTimeAsc(Timestamp.valueOf(timestamp));}

    @Override
    public List<Sprint> findAllByStopTimeBeforeOrderByStopTimeAsc(String timestamp) {
        return sprintRepository.findAllByStopTimeBeforeOrderByStopTimeAsc(Timestamp.valueOf(timestamp));}

    @Override
    public Sprint createSprint(PostSprintRequest postSprintRequest) {
        return sprintRepository.save(Sprint.builder()
                .sprintName(postSprintRequest.getSprint_name())
                .groupId(postSprintRequest.getGroup_id())
                .startTime(Timestamp.valueOf(postSprintRequest.getStart_time()))
                .stopTime(Timestamp.valueOf(postSprintRequest.getStop_time()))
                .build());
    }
}
