package com.backend.chmiel.dao;

import com.backend.chmiel.entity.Project;
import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;



public interface ProjectRepository extends JpaRepository<Project, Integer> {

    @Query(value = "SELECT p.* FROM Projects_Users pu RIGHT JOIN Projects p ON pu.project_id =p.id WHERE user_id = ?1", nativeQuery = true)
    List<Project> getAllByUserId(Integer user_id);

    void removeProjectById(Integer id);


}
