package com.backend.chmiel.payload;

import com.backend.chmiel.entity.Role;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
