package com.example.bookAPI.domain;
import com.example.bookAPI.domain.common.ContentEntity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "review")
@Getter
@Setter
@NoArgsConstructor
public class Review extends ContentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    private Long reviewId;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;

    @Column(nullable = false, length = 3000)
    private String content;

    @Column(nullable = false, name = "rating", columnDefinition = "DECIMAL(2, 1) CHECK (rating BETWEEN 0.5 AND 5)")
    private BigDecimal rating;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "content_id")
    private Content contents;
}