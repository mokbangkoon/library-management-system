package com.example.bookAPI.domain;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "book_status")
@Getter
@Setter
@NoArgsConstructor
public class BookStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "book_status_id")
    private Long bookStatusId;

    @OneToMany(mappedBy = "bookStatus") // mappedBy를 사용하여 연관 관계를 설정합니다.
    private List<BookShare> bookShareList; // 컬렉션 형태로 선언합니다.
}
