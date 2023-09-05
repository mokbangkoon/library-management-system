package com.example.bookAPI.dto.book.best;

public interface BookBestListResponseDto {
    Long getId();
    String getTitle();
    String getWriter();
    String getPublisher();
    String getImg();
    Long getShareCount();
    Long getFindCount();
}
