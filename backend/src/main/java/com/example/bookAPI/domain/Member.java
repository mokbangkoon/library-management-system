package com.example.bookAPI.domain;

import com.example.bookAPI.domain.common.TimeEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="member")
@Getter
@Setter
@NoArgsConstructor
public class Member extends TimeEntity {
    @Id
    @Column(name="member_id", insertable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(length = 255)
    private String email;

    @Column(length = 50)
    private String name;

    @Column(length = 500)
    private String password;

    @Column(name = "activated")
    private boolean activated;

    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(name = "member_role",
            joinColumns = @JoinColumn(name = "member_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    Set<Role> roles = new HashSet<>();

    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(name = "member_category",
            joinColumns = @JoinColumn(name = "member_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    Set<Category> categories = new HashSet<>();

    @OneToMany(mappedBy = "member")
    private List<MemberBook> memberBooks = new ArrayList<>();

    @OneToMany(mappedBy = "requesterId")
    private List<BookShare> bookShares = new ArrayList<>();

    @OneToMany(mappedBy = "sharerId")
    private List<BookShare> sharerId = new ArrayList<>();

    @OneToMany(mappedBy="member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy="member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Post> posts = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<PostTag> postTag = new ArrayList<>();

    @OneToOne(mappedBy = "member")
    private RefreshToken refreshToken;

    @OneToOne(mappedBy = "member")
    private Login login;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Team team;

    public void addRole(Role role){
        roles.add(role);
    }
}

