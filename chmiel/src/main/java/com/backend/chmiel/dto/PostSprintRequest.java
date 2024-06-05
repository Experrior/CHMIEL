package com.backend.chmiel.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostSprintRequest {

    private String sprintName;
    private Integer projectId;
    private Timestamp startTime;
    private Timestamp stopTime;

}
