package com.backend.chmiel.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDetailsResponse {
    private Integer id;
    private String firstName;
    private String lastName;
    private String email;
    private String address;
    private Date birthDate;
    private String phoneNumber;
}
