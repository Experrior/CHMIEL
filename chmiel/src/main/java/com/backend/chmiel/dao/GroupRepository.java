package com.backend.chmiel.dao;

import com.backend.chmiel.entity.Group;
import com.backend.chmiel.entity.User;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupRepository extends JpaRepository<Group, Integer> {
    
    Optional<Group> findByGroupName(String groupName);

    List<Group> findAllByGroupUsersUserId(Integer userId);

    List<Group> findAllByGroupUsersUser(User user);

    List<Group> findAllByGroupNameContaining(String keyword);

    
}
