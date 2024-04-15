package com.backend.chmiel.rest;

import com.backend.chmiel.config.JwtService;
import com.backend.chmiel.entity.User;
import com.backend.chmiel.payload.UserDetailsResponse;
import com.backend.chmiel.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final JwtService jwtService;

    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8084"})
    @GetMapping()
    public ResponseEntity<UserDetailsResponse> getUserDetails(@RequestHeader("Authorization") String token) {
        String email = jwtService.extractUsername(token.substring(7));
        return ResponseEntity.ok(userService.getUserDetailsByEmail(email));
    }
}
