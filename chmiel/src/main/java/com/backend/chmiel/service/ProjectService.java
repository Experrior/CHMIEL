package com.backend.chmiel.service;

import com.backend.chmiel.entity.Project;
import com.backend.chmiel.payload.PostProjectRequest;
import com.backend.chmiel.payload.PutProjectUserRequest;

import java.util.List;
import java.util.Optional;

public interface ProjectService {

    List<Project> findAll();

    Project findById(Integer project_id);

    List<Project> getAllByUserId(Integer user_id);

    Integer removeById(Integer id);

    Project createProject(PostProjectRequest postProjectRequest);


    String addUser(PutProjectUserRequest putProjectUserRequest);
}
