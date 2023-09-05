package com.example.bookAPI.domain;

import com.example.bookAPI.domain.common.ContentEntity;
import com.example.bookAPI.domain.common.TimeEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "member_book")
@Getter
@Setter
@NoArgsConstructor
public class MemberBook extends ContentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id")
    private Book book;

    @Column(name = "is_has", columnDefinition = "boolean default true")
    private boolean isHas;

    @Column(name = "is_read", columnDefinition = "boolean default false")
    private boolean isRead;
}
