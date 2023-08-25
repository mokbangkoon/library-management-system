package com.example.bookAPI.domain;

import com.example.bookAPI.domain.common.ContentEntity;
import com.example.bookAPI.domain.common.TimeEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "member_noti")
@Getter
@Setter
@NoArgsConstructor
public class MemberNoti extends TimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "notification_id")
    private Notification notification;

    @Column(name = "is_read", columnDefinition = "boolean default false")
    private boolean isRead;
}
