package com.backend.chmiel.dao;

import com.backend.chmiel.entity.Group;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupRepository extends JpaRepository<Group, Integer> {
    
    Optional<Group> findByGroupName(String groupName);

    List<Group> findAllByGroupNameContaining(String keyword);


    
}
