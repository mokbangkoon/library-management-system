

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
    @JoinColumn(name = "requester_id", referencedColumnName = "member_id")
    private Member requesterId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sharer_id", referencedColumnName = "member_id")
    private Member sharerId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id")
    private Book book;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_status_id")
    private BookStatus bookStatus;


    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "content_id")
    private Content contents;
}
