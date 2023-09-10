package com.example.bookAPI.dto.book.detail;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Builder
public class BookDetailResponseDto {
    private Long id;
    private String title;
    private String writer;
    private String img;
    private String publisher;
    private String subtitle;
    private String categories;
    private Long shareCount;
    private Long findCount;
    private Double avgRating;
    private Long reviewCount;
    private String publishDate;
    private int count;
    private String detailNum;
    private String introduce;
    private Boolean isEBook;
    private Boolean isShare;
    private Boolean isFind;

    public BookDetailResponseDto(Long id, String title, String writer, String img, String publisher, String subtitle, String categories, Long shareCount, Long findCount, Double avgRating, Long reviewCount, String publishDate, int count, String detailNum, String introduce, Boolean isEBook, Boolean isShare, Boolean isFind) {
        this.id = id;
        this.title = title;
        this.writer = writer;
        this.img = img;
        this.publisher = publisher;
        this.subtitle = subtitle;
        this.categories = categories;
        this.shareCount = shareCount;
        this.findCount = findCount;
        this.avgRating = avgRating;
        this.reviewCount = reviewCount;
        this.publishDate = publishDate;
        this.count = count;
        this.detailNum = detailNum;
        this.introduce = introduce;
        this.isEBook = isEBook;
        this.isShare = isShare;
        this.isFind = isFind;
    }
}