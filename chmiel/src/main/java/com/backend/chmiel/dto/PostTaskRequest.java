package com.backend.chmiel.dto;

import com.backend.chmiel.entity.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostTaskRequest {

    private Integer assigneeId;

    private Integer projectId;

    private Integer sprintId;

    private String name;

    private String description;

    private Float timeEstimate;

    private boolean isEpic;

    private Integer inEpic;

    private Status status;
}
