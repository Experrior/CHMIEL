package com.backend.chmiel.config;

import com.backend.chmiel.dao.SprintRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class SprintTaskCountComponent{
    private final SprintRepository sprintRepository;

    public SprintTaskCountComponent(SprintRepository sprintRepository) {
        this.sprintRepository = sprintRepository;
    }

    @Scheduled(fixedRate=1000*20) // runs every 12 hours
    public void SprintTaskCountComponent() {
        System.out.println("Updating task count - " + System.currentTimeMillis() / 1000);

        sprintRepository.updateSprintsStartingTaskCount();

        sprintRepository.updateSPrintsEndingTaskCount();
    }



}