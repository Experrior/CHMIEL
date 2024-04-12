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
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SequenceTaskId")
    @SequenceGenerator(name = "SequenceTaskId", sequenceName = "tasks_task_id_seq", allocationSize = 1)
    private Integer taskId;

    @ManyToOne
    @JoinColumn(name = "assignee_id")
    private User assignee;

    @ManyToOne
    @JoinColumn(name = "reported_id")
    private User reporter;

    @ManyToOne
    @JoinColumn(name = "group_id")
    private Group group;

    @ManyToOne
    @JoinColumn(name = "sprint_id")
    private Sprint sprint;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "logged_hours")
    private Float loggedHours;

    @Column(name = "time_estimate")
    private Float timeEstimate;

    @Enumerated(EnumType.STRING)
    private Status status;

    @Column(name = "is_epic")
    private boolean isEpic;

    @ManyToOne
    @JoinColumn(name = "in_epic")
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
