package com.example.bookAPI.domain;

import com.example.bookAPI.domain.common.TimeEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "notification")
@Getter
@Setter
@NoArgsConstructor
public class Notification extends TimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notification_id")
    private Long id;

    private String type;
    private String message;

    @OneToMany(mappedBy = "notification")
    private List<MemberNoti> memberNotifications;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "content_id")
    private Content content;
}
