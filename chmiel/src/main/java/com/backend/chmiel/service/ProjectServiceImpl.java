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

import java.util.*;

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
    public Project createProject(Integer id, String projectName) {
        Set<User> users = new HashSet<>();
        userRepository.findById(id).ifPresent(users::add);

        return projectRepository.save(Project.builder()
                .projectOwner(id)
                .projectName(projectName)
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
        User user = userRepository.findById(putProjectUserRequest.userId).orElseThrow(() -> new EntityNotFoundException("No user with given id found in database."));
        //check if project exists
        Project project = projectRepository.findById(putProjectUserRequest.projectID).orElseThrow(() -> new EntityNotFoundException("No project with given id found in database."));

            Optional<Project> proj1 = projectRepository.findById(putProjectUserRequest.getProjectID());
            Set<User> users = proj1.get().getUsers();
            users.add(user);
            proj1.get().setUsers(users);
            projectRepository.save(proj1.get());
            return "Correctly added user to project";
    }

    @Override
    public Project removeUserById(Integer projectId, Integer userId) {
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new EntityNotFoundException("User not found"));
        User user = userRepository.findById(userId).orElseThrow(() -> new EntityNotFoundException("User not found"));
        project.getUsers().remove(user);
        return projectRepository.save(project);
    }

    @Override
    public List<User> getAllUsers(Integer projectId) {
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new EntityNotFoundException("Project not found."));
        List<User> usersList = new ArrayList<User>(project.getUsers());
        return usersList;
    }

    @Override
    public List<Project> getAllByUserId(Integer user_id) {
        return projectRepository.getAllByUserId(user_id);
    }


}
