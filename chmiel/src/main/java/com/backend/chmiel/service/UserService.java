package com.backend.chmiel.service;

import com.backend.chmiel.auth.RegisterRequest;
import com.backend.chmiel.entity.User;
import com.backend.chmiel.payload.EditUserDetailsRequest;
import com.backend.chmiel.payload.PostPremadeUserRequest;
import com.backend.chmiel.payload.UserDetailsResponse;

public interface UserService {
    UserDetailsResponse getUserDetailsById(Integer id);
    UserDetailsResponse editUserDetailsById(Integer id, EditUserDetailsRequest request);

    User changeUserPassword(Integer id, String password);

}
