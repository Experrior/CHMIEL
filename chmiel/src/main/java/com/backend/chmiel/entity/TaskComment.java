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
    @SequenceGenerator(name = "SequenceTaskCommentId", sequenceName = "task_comments_task_comment_id_seq", allocationSize = 1)
    private Integer taskCommentId;

    @ManyToOne
    @JoinColumn(name = "task_id")
    private Task task;

    @Column(name = "message")
    private String message;

    @ManyToOne
    @JoinColumn(name = "author_id")
    private User author;

    @Column(name = "logged")
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
