package com.backend.chmiel.service;

import com.backend.chmiel.entity.Project;
import com.backend.chmiel.dto.PostProjectRequest;
import com.backend.chmiel.dto.PutProjectRequest;
import com.backend.chmiel.dto.PutProjectUserRequest;

import java.util.List;

public interface ProjectService {

    List<Project> findAll();

    Project findById(Integer project_id);

    List<Project> getAllByUserId(Integer user_id);

    Boolean removeById(Integer id);

    Project createProject(PostProjectRequest postProjectRequest);

    Project editName(PutProjectRequest putProjectRequest);

    String addUser(PutProjectUserRequest putProjectUserRequest);
}
