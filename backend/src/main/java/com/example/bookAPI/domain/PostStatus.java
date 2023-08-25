package com.example.bookAPI.domain;

import com.example.bookAPI.dto.Enum.PostState;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "post_status")
@Getter
@Setter
@NoArgsConstructor
public class PostStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_status_id")
    private Long post_status_id;

    @Column(name = "post_status")
    @Enumerated(EnumType.STRING)
    private PostState postState;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;
}
