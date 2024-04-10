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
@Table(name = "Tasks")
public class Task {

    @Id
    @GeneratedValue
    private Integer taskId;

    @ManyToOne
    @JoinColumn(name = "assigneeId")
    private User assignee;

    @ManyToOne
    @JoinColumn(name = "reportedId")
    private User reporter;

    @ManyToOne
    @JoinColumn(name = "groupId")
    private Group group;

    @ManyToOne
    @JoinColumn(name = "sprintId")
    private Sprint sprint;

    private String name;

    private String description;

    private Float loggedHours;

    private Float timeEstimate;

    @Enumerated(EnumType.STRING)
    private Status status;

    private boolean isEpic;

    @ManyToOne
    @JoinColumn(name = "inEpic")
    private Task inEpic;

    @Override
    public String toString() {
        return "Task{" +
                "taskId=" + taskId +
                ", assignee=" + assignee +
                ", reporter=" + reporter +
                ", group=" + group +
                ", sprint=" + sprint +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", loggedHours=" + loggedHours +
                ", timeEstimate=" + timeEstimate +
                ", status='" + status + '\'' +
                ", isEpic=" + isEpic +
                ", inEpic=" + inEpic +
                '}';
    }
}
