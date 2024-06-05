package com.backend.chmiel.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.Optional;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostPremadeUserRequest {

    private String firstName;

    private String lastName;

    private String email;

    private String password;

    private Optional<String> address;

    private Optional<Date> birthDate;

    private Optional<String> phoneNumber;

}
