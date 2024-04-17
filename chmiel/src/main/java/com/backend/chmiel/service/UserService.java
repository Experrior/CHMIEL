package com.backend.chmiel.service;

import com.backend.chmiel.payload.EditUserDetailsRequest;
import com.backend.chmiel.payload.UserDetailsResponse;

public interface UserService {
    UserDetailsResponse getUserDetailsById(Integer id);
    UserDetailsResponse editUserDetailsById(Integer id, EditUserDetailsRequest request);

}
