package com.example.bookAPI.domain.common;

import lombok.Getter;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public class TimeEntity {
    @CreatedDate
    @Column(name="create_date_time")
    private LocalDateTime createDateTime;

    @LastModifiedDate
    @CreationTimestamp
    @Column(name="update_date_time")
    private LocalDateTime updateDateTime;

    @PrePersist
    public void onPrePersist(){
        this.createDateTime = LocalDateTime.now();
        this.updateDateTime = this.createDateTime;
    }

    @PreUpdate
    public void onPreUpdate(){
        this.updateDateTime = LocalDateTime.now();
    }
}
