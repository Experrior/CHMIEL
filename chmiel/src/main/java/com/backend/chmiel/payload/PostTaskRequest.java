package com.backend.chmiel.payload;

import com.backend.chmiel.entity.Sprint;
import com.backend.chmiel.entity.Status;
import com.backend.chmiel.entity.Task;
import com.backend.chmiel.entity.User;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Optional;

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
