package com.backend.chmiel.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Sprints")
public class Sprint {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SequenceSprintId")
    @SequenceGenerator(name = "SequenceSprintId", sequenceName = "sprints_id_seq", allocationSize = 1)
    private Integer id;

    @Column(name = "sprint_name")
    private String sprintName;

    @Column(name = "project_id")
    private Integer projectId;

    @Column(name = "start_time")
    private Timestamp startTime;

    @Column(name = "stop_time")
    private Timestamp stopTime;

    @Column(name = "logged")
    private boolean logged;

    @Column(name = "is_started")
    private boolean isStarted;

    @Column(name = "is_finished")
    private boolean isFinished;


    @Override
    public String toString() {
        return "Sprint{" +
                "sprintId=" + id +
                ", sprintName='" + sprintName + '\'' +
                ", projectId=" + projectId +
                ", startTime=" + startTime +
                ", stopTime=" + stopTime +
                ", logged=" + logged +
                '}';
    }
}
