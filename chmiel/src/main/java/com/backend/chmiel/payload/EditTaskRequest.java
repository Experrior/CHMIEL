package com.backend.chmiel.payload;

import com.backend.chmiel.entity.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EditTaskRequest {
    private Integer id;
    private Integer assigneeId;
    private Integer sprintId;
    private String name;
    private String description;
    private Float loggedHours;
    private Float timeEstimate;
    private Status status;
    private boolean inEpic;
}
