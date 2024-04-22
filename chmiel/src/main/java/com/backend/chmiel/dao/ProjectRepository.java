package com.backend.chmiel.dao;

import com.backend.chmiel.entity.Project;
import java.util.List;

import org.hibernate.annotations.SQLInsert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;


public interface ProjectRepository extends JpaRepository<Project, Integer> {

    List<Project> findAllById(Integer id);
    @Query(value = "SELECT p.* FROM Projects_Users pu RIGHT JOIN Projects p ON pu.project_id =p.id WHERE user_id = ?1", nativeQuery = true)
    List<Project> getAllByUserId(Integer user_id);

    List<Project> findAll();

    Integer removeProjectById(Integer id);

    //TODO fix issue with (return value)?


    @Query(value = "INSERT Projects_Users(project_id, user_id) VALUES(?1, ?2)", nativeQuery = true)
    void addProjectUser( Integer projectId, Integer userId);

}
