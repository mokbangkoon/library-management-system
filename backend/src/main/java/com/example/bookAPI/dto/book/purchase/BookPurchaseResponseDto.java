package com.example.bookAPI.dto.book.purchase;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BookPurchaseResponseDto implements BookPurchaseListResponseDto{
    private Long id;
    private String title;
    private String writer;
    private String img;
    private String categories;
    private String publisher;
    private Long shareCount;
    private Long findCount;
    public BookPurchaseResponseDto(Long id, String title, String writer, String img, String categories) {
        this.id = id;
        this.title = title;
        this.writer = writer;
        this.img = img;
        this.categories = categories;
    }
}
