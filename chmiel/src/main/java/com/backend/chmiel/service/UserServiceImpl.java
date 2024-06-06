package com.backend.chmiel.service;

import com.backend.chmiel.dao.UserRepository;
import com.backend.chmiel.entity.User;
import com.backend.chmiel.dto.EditUserDetailsRequest;
import com.backend.chmiel.dto.UserDetailsResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public UserDetailsResponse getUserDetailsById(Integer id) {
        User user = userRepository.findById(id).orElseThrow();
        return UserDetailsResponse.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .address(user.getAddress())
                .birthDate(user.getBirthDate())
                .phoneNumber(user.getPhoneNumber())
                .build();
    }

    @Override
    public UserDetailsResponse editUserDetailsById(Integer id, EditUserDetailsRequest request) {
        User user = userRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setAddress(request.getAddress());
        user.setBirthDate(request.getBirthDate());
        user.setPhoneNumber(request.getPhoneNumber());
        userRepository.save(user);
        return UserDetailsResponse.builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .address(user.getAddress())
                .birthDate(user.getBirthDate())
                .phoneNumber(user.getPhoneNumber())
                .build();
    }

    @Override
    public List<User> getConnections(Integer id) {
        User user = userRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        List<User> users =userRepository.getConnections(id);
        users.remove(user);
        return users;
    }

    @Override
    public User changeUserPassword(Integer id, String password) {
        User user = userRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        user.setPassword(password);
        userRepository.save(user);
        return user;
    }



}
