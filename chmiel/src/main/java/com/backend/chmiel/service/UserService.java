package com.backend.chmiel.service;

import com.backend.chmiel.entity.User;
import com.backend.chmiel.payload.EditUserDetailsRequest;
import com.backend.chmiel.payload.UserDetailsResponse;

import java.util.List;

public interface UserService {
    UserDetailsResponse getUserDetailsById(Integer id);
    UserDetailsResponse editUserDetailsById(Integer id, EditUserDetailsRequest request);

}
