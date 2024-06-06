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
public class EditSprintRequest {
    private String sprintName;
    private Timestamp startTime;
    private Timestamp stopTime;
    private Boolean isStarted;
    private Boolean isFinished;
}
