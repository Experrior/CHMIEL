package com.backend.chmiel.service;

import com.backend.chmiel.entity.User;
import com.backend.chmiel.dto.EditUserDetailsRequest;
import com.backend.chmiel.dto.UserDetailsResponse;

import java.util.List;

public interface UserService {
    UserDetailsResponse getUserDetailsById(Integer id);
    UserDetailsResponse editUserDetailsById(Integer id, EditUserDetailsRequest request);

    List<User> getAll();
    List<User> getConnections(Integer id);
    User changeUserPassword(Integer id, String password);

    List<User> getByEmail(String regex);
}
