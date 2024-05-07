package com.backend.chmiel.payload;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostSprintRequest {

//    private String sprintName;
    private Integer projectId;
//    private String startTime;
//    private String stopTime;

}
