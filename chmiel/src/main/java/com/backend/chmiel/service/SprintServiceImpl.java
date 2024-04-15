package com.backend.chmiel.service;

import com.backend.chmiel.dao.SprintRepository;
import com.backend.chmiel.entity.Sprint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
