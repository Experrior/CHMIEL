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
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "assignee_id")
    private User assignee;

    @OneToOne
    @JoinColumn(name = "reporter_id")
    private User reporter;

    @Column(name = "project_id")
    private Integer projectId;

    @OneToOne
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
                "id=" + id +
                ", assignee=" + assignee +
                ", reporter=" + reporter +
                ", projectId=" + projectId +
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
