package com.example.bookAPI.domain;

import com.example.bookAPI.dto.Enum.BookState;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
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

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private BookState status;

    @OneToMany(mappedBy = "bookStatus", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<BookShare> bookShareList = new ArrayList<>();
}
