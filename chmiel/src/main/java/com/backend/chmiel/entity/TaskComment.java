package com.backend.chmiel.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Task_Comments")
public class TaskComment {

    @Id
    @GeneratedValue
    private Integer taskCommentId;

    @ManyToOne
    @JoinColumn(name = "taskId")
    private Task task;

    private String message;

    @ManyToOne
    @JoinColumn(name = "authorId")
    private User author;

    private boolean logged;

    @Override
    public String toString() {
        return "TaskComment{" +
                "taskCommentId=" + taskCommentId +
                ", task=" + task +
                ", message='" + message + '\'' +
                ", author=" + author +
                ", logged=" + logged +
                '}';
    }
}
