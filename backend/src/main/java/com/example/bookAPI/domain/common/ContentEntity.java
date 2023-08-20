package com.example.bookAPI.domain.common;


import lombok.Getter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;

@Getter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public class ContentEntity extends TimeEntity {
    @Column(name = "is_deleted", columnDefinition = "boolean default false")
    private boolean isDeleted;
}
