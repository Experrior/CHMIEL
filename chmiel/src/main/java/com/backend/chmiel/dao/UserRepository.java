package com.backend.chmiel.dao;


import com.backend.chmiel.entity.Role;
import com.backend.chmiel.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);

    List<User> findByFirstName(String firstName);

    List<User> findByLastName(String lastName);

    List<User> findByRole(Role role);


    @Query(value="SELECT DISTINCT u.* FROM users u JOIN projects_users pu ON u.id = pu.user_id JOIN projects p ON pu.project_id = p.id WHERE p.id IN ( SELECT user_id FROM projects_users WHERE user_id = 1)", nativeQuery = true)
    List<User> getConnections(Integer id);

}
