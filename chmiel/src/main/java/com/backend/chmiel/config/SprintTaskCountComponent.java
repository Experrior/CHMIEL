package com.backend.chmiel.config;

import com.backend.chmiel.dao.SprintRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class SprintTaskCountComponent{
    private final SprintRepository sprintRepository;

    public SprintTaskCountComponent(SprintRepository sprintRepository) {
        this.sprintRepository = sprintRepository;
    }

    @Scheduled(fixedRate=1000* 30) // runs every 30  sec
    public void SprintTaskCountComponent() {
        System.out.println("Updating task count - " + System.currentTimeMillis() / 1000);

        sprintRepository.updateSprintsStartingTaskCount();

        sprintRepository.updateSprintsEndingTaskCount();
        sprintRepository.updatePregeneratedSprintsData();
        sprintRepository.hotfixCount();
    }


}