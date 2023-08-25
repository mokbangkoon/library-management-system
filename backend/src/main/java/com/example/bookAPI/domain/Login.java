package com.example.bookAPI.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name="login")
@NoArgsConstructor
@Setter
@Getter
public class Login {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "login_id")
    private Long login_id;

    @Column(length = 20)
    private String name;

    @OneToOne
    @JoinColumn(name = "member_id")
    private Member member;
}

