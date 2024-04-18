package com.backend.chmiel.service;

import com.backend.chmiel.entity.Group;

import java.util.List;
import java.util.Optional;

public interface GroupService {
    List<Group> findAll();

    void removeById(Integer id);

    Optional<Group> findById(Integer id);
}
