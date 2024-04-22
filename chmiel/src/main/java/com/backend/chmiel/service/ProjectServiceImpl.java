package com.backend.chmiel.service;

import com.backend.chmiel.dao.ProjectRepository;
import com.backend.chmiel.dao.UserRepository;
import com.backend.chmiel.entity.Project;
import com.backend.chmiel.entity.User;
import com.backend.chmiel.payload.PostProjectRequest;
import com.backend.chmiel.payload.PutProjectUserRequest;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
//    @PersistenceContext
//    private final EntityManager em;
    @Autowired
    public ProjectServiceImpl(ProjectRepository projectRepository, UserRepository userRepository, EntityManager em) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
//        this.em = em;
    }

    @Override
    public List<Project> findAll() {
        return projectRepository.findAll();
    }

    @Override
    public Integer removeById(Integer id) {
        return projectRepository.removeProjectById(id);
    }

    @Override
    public Project createProject(PostProjectRequest postProjectRequest) {
        return projectRepository.save(Project.builder()
                .projectOwner(postProjectRequest.getProjectOwner())
                .projectName(postProjectRequest.getName())
                .build());
    }

    @Override
    public String addUser(PutProjectUserRequest putProjectUserRequest) {
        //check if user exists
        Optional<User> user = userRepository.findById(putProjectUserRequest.userId);
        //check if project exists
        Optional<Project> project = projectRepository.findById(putProjectUserRequest.projectID);

        //TODO add exception here
        if (user.isPresent() && project.isPresent()){
//            Query q =  em.createNativeQuery("INSERT INTO Projects_Users(project_id, user_id) VALUES(:projectId, :userId)");
//            BigInteger biid = (BigInteger) q.getSingleResult();
//            long id = biid.longValue();
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
