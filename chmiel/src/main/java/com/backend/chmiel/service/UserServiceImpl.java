package com.backend.chmiel.service;

import com.backend.chmiel.dao.UserRepository;
import com.backend.chmiel.entity.User;
import com.backend.chmiel.exception.UserNotFoundException;
import com.backend.chmiel.payload.UserDetailsResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public UserDetailsResponse getUserDetailsByEmail(String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        return UserDetailsResponse.builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .birthDate(user.getBirthDate())
                .phoneNumber(user.getPhoneNumber())
                .build();
    }
}
