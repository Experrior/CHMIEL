package com.backend.chmiel.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Groups", uniqueConstraints = {@UniqueConstraint(name = "nameUnique", columnNames = {"groupName"})})
public class Group {

    @Id
    @GeneratedValue
    private Integer groupId;

    private String groupName;

    @OneToMany(mappedBy = "group", cascade = CascadeType.ALL)
    private List<GroupUser> groupUsers;

    @OneToMany(mappedBy = "group", cascade = CascadeType.ALL)
    private List<Sprint> sprints;

    @Override
    public String toString() {
        return "Group{" +
                "groupId=" + groupId +
                ", groupName='" + groupName + '\'' +
                '}';
    }
}