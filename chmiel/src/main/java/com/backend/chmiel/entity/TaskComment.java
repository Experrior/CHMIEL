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
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SequenceTaskCommentId")
    @SequenceGenerator(name = "SequenceTaskCommentId", sequenceName = "task_comments_id_seq", allocationSize = 1)
    private Integer id;

    @Column(name = "task_id")
    private Integer taskId;

    @Column(name = "message")
    private String message;

    @Column(name = "author_id")
    private Integer author;

    @Column(name = "logged")
    private boolean logged;

    @Override
    public String toString() {
        return "TaskComment{" +
                "taskCommentId=" + id +
                ", task=" + taskId +
                ", message='" + message + '\'' +
                ", author=" + author +
                ", logged=" + logged +
                '}';
    }
}
