package com.backend.chmiel.rest;

import com.backend.chmiel.config.JwtService;
import com.backend.chmiel.entity.User;
import com.backend.chmiel.dto.EditUserDetailsRequest;
import com.backend.chmiel.dto.UserDetailsResponse;
import com.backend.chmiel.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final JwtService jwtService;


    @GetMapping("")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8084"})
    public ResponseEntity<UserDetailsResponse> getUserDetails(@RequestHeader("Authorization") String token) {
        Integer id = jwtService.extractClaim(token.substring(7), (claims) -> claims.get("userId", Integer.class));
        return ResponseEntity.ok(userService.getUserDetailsById(id));
    }

    @GetMapping("getAll")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8084"})
    public ResponseEntity<List<User>> getConnections() {
        return ResponseEntity.ok(userService.getAll());
    }

    @GetMapping("getConnections")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8084"})
    public ResponseEntity<List<User>> getConnections(@RequestHeader("Authorization") String token) {
        Integer id = jwtService.extractClaim(token.substring(7), (claims) -> claims.get("userId", Integer.class));
        return ResponseEntity.ok(userService.getConnections(id));
    }

    @PutMapping("")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8084"})
    public ResponseEntity<UserDetailsResponse> editUserDetails(@RequestHeader("Authorization") String token, @RequestBody EditUserDetailsRequest request) {
        Integer id = jwtService.extractClaim(token.substring(7), (claims) -> claims.get("userId", Integer.class));
        return ResponseEntity.ok(userService.editUserDetailsById(id, request));
    }


    @PutMapping("changePassword")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8084"})
    public ResponseEntity<User> changePassword(@RequestHeader("Authorization") String token,
                                               @RequestBody String password) {
        Integer id = jwtService.extractClaim(token.substring(7), (claims) -> claims.get("userId", Integer.class));
        return ResponseEntity.ok(userService.changeUserPassword(id, password));
    }


}
