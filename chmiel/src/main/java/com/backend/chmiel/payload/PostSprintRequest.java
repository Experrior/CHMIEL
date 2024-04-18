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

    @Schema(example = "CD-WTF")
    private String sprint_name;
    private Integer group_id;
    private String start_time;
    private String stop_time;

}
