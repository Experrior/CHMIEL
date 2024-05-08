package com.backend.chmiel.entity;


import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EpicsData {
    private String epicName;
    private Status taskStatus;
    private Integer sprintId;

}
