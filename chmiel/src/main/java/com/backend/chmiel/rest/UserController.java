package com.backend.chmiel.rest;

import com.backend.chmiel.auth.RegisterRequest;
import com.backend.chmiel.config.JwtService;
import com.backend.chmiel.entity.User;
import com.backend.chmiel.payload.EditUserDetailsRequest;
import com.backend.chmiel.payload.PostPremadeUserRequest;
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
        Integer id = jwtService.extractClaim(token.substring(7), (claims) -> claims.get("userId", Integer.class));
        return ResponseEntity.ok(userService.getUserDetailsById(id));
    }

    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8084"})
    @PutMapping()
    public ResponseEntity<UserDetailsResponse> editUserDetails(@RequestHeader("Authorization") String token, @RequestBody EditUserDetailsRequest request) {
        Integer id = jwtService.extractClaim(token.substring(7), (claims) -> claims.get("userId", Integer.class));
        return ResponseEntity.ok(userService.editUserDetailsById(id, request));
    }


    @PutMapping("changePassword")
    public ResponseEntity<User> changePassword(@RequestHeader("Authorization") String token,
                                               @RequestBody String password) {
        Integer id = jwtService.extractClaim(token.substring(7), (claims) -> claims.get("userId", Integer.class));
        return ResponseEntity.ok(userService.changeUserPassword(id, password));
    }


}
