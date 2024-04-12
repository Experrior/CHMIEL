package com.backend.chmiel.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Sprints")
public class Sprint {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SequenceSprintId")
    @SequenceGenerator(name = "SequenceSprintId", sequenceName = "sprints_sprint_id_seq", allocationSize = 1)
    private Integer sprintId;

    @Column(name = "sprint_name")
    private String sprintName;

    @ManyToOne
    @JoinColumn(name = "group_id")
    private Group group;

    @Column(name = "start_time")
    private Timestamp startTime;

    @Column(name = "stop_time")
    private Timestamp stopTime;

    @Column(name = "logged")
    private boolean logged;

    @Override
    public String toString() {
        return "Sprint{" +
                "sprintId=" + sprintId +
                ", sprintName='" + sprintName + '\'' +
                ", group=" + group +
                ", startTime=" + startTime +
                ", stopTime=" + stopTime +
                ", logged=" + logged +
                '}';
    }
}
