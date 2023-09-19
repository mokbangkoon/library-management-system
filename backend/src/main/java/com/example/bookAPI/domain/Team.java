package com.example.bookAPI.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="team")
@NoArgsConstructor
@Setter
@Getter
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "team_id")
    private Long teamId;

    @Column(length = 20)
    private String name;

    @OneToMany(mappedBy = "team")
    private List<Member> member;
}

