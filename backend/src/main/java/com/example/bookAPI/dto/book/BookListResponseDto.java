package com.example.bookAPI.dto.book;

public interface BookListResponseDto {
    Long getId();
    String getTitle();
    String getWriter();
    String getPublisher();
    String getImg();
    Long getShareCount();
    Long getFindCount();
}
