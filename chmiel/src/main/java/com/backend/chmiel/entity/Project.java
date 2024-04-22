package com.backend.chmiel.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Projects", uniqueConstraints = {@UniqueConstraint(name = "nameUnique", columnNames = {"project_name"})})
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SequenceProjectId")
    @SequenceGenerator(name = "SequenceProjectId", sequenceName = "projects_id_seq", allocationSize = 1)
    private Integer id;

    @Column(name = "project_name")
    private String projectName;

    @Column(name = "project_owner")
    private Integer projectOwner;

    @JoinTable(name = "projects_users",
            joinColumns = @JoinColumn(name = "project_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id") )
    @ManyToMany(targetEntity = User.class)
    private Set<User> users;

    @Override
    public String toString() {
        return "Project{" +
                "id=" + id +
                ", projectName='" + projectName + '\'' +
                ", projectOwner='" + projectOwner + '\'' +
                '}';
    }
}
