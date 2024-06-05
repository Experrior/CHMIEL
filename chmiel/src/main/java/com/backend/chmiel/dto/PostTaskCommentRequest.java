package com.backend.chmiel.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostTaskCommentRequest {
    private Integer taskId;
    @Schema(example = "Example message")
    private String message;
    private Integer authorId;

}
