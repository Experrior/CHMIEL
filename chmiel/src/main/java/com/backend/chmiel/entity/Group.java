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
@Table(name = "Groups", uniqueConstraints = {@UniqueConstraint(name = "nameUnique", columnNames = {"group_name"})})
public class Group {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SequenceGroupId")
    @SequenceGenerator(name = "SequenceGroupId", sequenceName = "groups_id_seq", allocationSize = 1)
    private Integer id;

    @Column(name = "group_name")
    private String groupName;


    @JoinTable(name = "groups_users",
            joinColumns = @JoinColumn(name = "group_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    @ManyToMany(targetEntity = User.class)
    private Set<User> users;


    @OneToMany(mappedBy = "id", cascade = CascadeType.ALL)
    private List<Sprint> sprints;

    @Override
    public String toString() {
        return "Group{" +
                "id=" + id +
                ", groupName='" + groupName + '\'' +
                '}';
    }
}
