package com.backend.chmiel.payload;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostTaskCommentRequest {
    private Integer task_id;
    private String message;
    private Integer author_id;

}
