package com.example.bookAPI.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "content")
@Getter
@Setter
@NoArgsConstructor
public class Content {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "content_id")
    private Long contentId;

    private int contentType;

    private String message;

    @OneToOne(mappedBy = "contents")
    private Post post;

    @OneToOne(mappedBy = "contents") // mappedBy를 사용하여 연관 관계를 설정합니다.
    private BookShare bookShare; // BookShare와 연관된 필드로 수정합니다.


    @OneToOne(mappedBy = "contents")
    private Review review;

}
