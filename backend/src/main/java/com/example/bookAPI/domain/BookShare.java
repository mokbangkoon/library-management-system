

package com.example.bookAPI.domain;

import com.example.bookAPI.domain.common.ContentEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "book_share")
@Getter
@Setter
@NoArgsConstructor
public class BookShare extends ContentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "book_share_id")
    private Long bookShareId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "requesterId", referencedColumnName = "member_id")
    private Member requesterId; // 책 요청자 정보

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sharerId", referencedColumnName = "member_id")
    private Member sharerId; // 책 공유자 정보

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id")
    private Book book;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_status_id") // 올바른 외래 키로 변경합니다.
    private BookStatus bookStatus; // BookStatus와 연관된 필드로 수정합니다.


    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "content_id")
    private Content contents;
}
