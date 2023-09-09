package com.example.bookAPI.dto.book.review;

import com.example.bookAPI.dto.book.BookBaseResponseDto;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class BookReviewResponseDto extends BookBaseResponseDto implements BookReviewListResponseDto {
    private Long shareCount;
    private Long findCount;
    private String content;
    private String name;
    private BigDecimal rating;
    private LocalDateTime createDateTime;

    public BookReviewResponseDto(Long id, String title, String writer, String publisher, String img, String content, String name, BigDecimal rating, LocalDateTime createDateTime) {
        super(id, title, writer, publisher, img);
        this.content = content;
        this.name = name;
        this.rating = rating;
        this.createDateTime = createDateTime;
    }

    public BookReviewResponseDto(Long id, String title, String writer, String publisher, String img, Long shareCount, Long findCount, String content, String name, BigDecimal rating, LocalDateTime createDateTime) {
        super(id, title, writer, publisher, img);
        this.shareCount = shareCount;
        this.findCount = findCount;
        this.content = content;
        this.name = name;
        this.rating = rating;
        this.createDateTime = createDateTime;
    }

}
