package com.example.bookAPI.dto.book.review;

import lombok.Data;

import java.util.List;

@Data
public class BookReviewResult {
    private List<BookReviewResponseDto> books;
    private int totalPage;
    private long totalCount;
    private int currentPage;
    private boolean isLastPage;

    public BookReviewResult(List<BookReviewResponseDto> books, int totalPage, long totalCount, int currentPage, boolean isLastPage) {
        this.books = books;
        this.totalPage = totalPage;
        this.totalCount = totalCount;
        this.currentPage = currentPage;
        this.isLastPage = isLastPage;
    }
}
