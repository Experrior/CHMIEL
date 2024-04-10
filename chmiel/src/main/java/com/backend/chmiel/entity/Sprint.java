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
    @GeneratedValue
    private Integer sprintId;

    private String sprintName;

    @ManyToOne
    @JoinColumn(name = "groupId")
    private Group group;

    private Timestamp startTime;

    private Timestamp stopTime;

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
