package com.backend.chmiel.service;

import com.backend.chmiel.dao.ProjectRepository;
import com.backend.chmiel.dao.UserRepository;
import com.backend.chmiel.entity.Project;
import com.backend.chmiel.entity.User;
import com.backend.chmiel.dto.PostProjectRequest;
import com.backend.chmiel.dto.PutProjectRequest;
import com.backend.chmiel.dto.PutProjectUserRequest;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    @Autowired
    public ProjectServiceImpl(ProjectRepository projectRepository, UserRepository userRepository) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<Project> findAll() {
        return projectRepository.findAll();
    }

    @Override
    public Project findById(Integer project_id) {
        return projectRepository.findById(project_id).orElseThrow(() -> new EntityNotFoundException("No project with given id found in database."));
    }

    @Override
    public Boolean removeById(Integer id) {
        projectRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("No project with given id found in database."));
        projectRepository.removeProjectById(id);
        return true;
    }

    @Override
    public Project createProject(PostProjectRequest postProjectRequest) {
        Set<User> users = new HashSet<>();
        userRepository.findById(postProjectRequest.getProjectOwner()).ifPresent(users::add);
        return projectRepository.save(Project.builder()
                .projectOwner(postProjectRequest.getProjectOwner())
                .projectName(postProjectRequest.getName())
                .users(users)
                .build());
    }


    @Override
    public Project editName(PutProjectRequest putProjectRequest) {
        Project project = projectRepository.findById(putProjectRequest.getId()).orElseThrow();
        project.setProjectName(putProjectRequest.getName());

        return projectRepository.save(project);
    }

    @Override
    public String addUser(PutProjectUserRequest putProjectUserRequest) {
        //check if user exists
        Optional<User> user = userRepository.findById(putProjectUserRequest.userId);
        //check if project exists
        Optional<Project> project = projectRepository.findById(putProjectUserRequest.projectID);


        if (user.isPresent() && project.isPresent()){

            Optional<Project> proj1 = projectRepository.findById(putProjectUserRequest.getProjectID());
            Set<User> users = proj1.get().getUsers();
            users.add(user.get());
            proj1.get().setUsers(users);
            projectRepository.save(proj1.get());
            return "Correctly added user to project";
        }else{
            return "Either project or user was not found.";
        }

    }

    @Override
    public List<Project> getAllByUserId(Integer user_id) {
        return projectRepository.getAllByUserId(user_id);
    }


}
