package com.example.bookAPI.dto.book.best;

import lombok.Data;

import java.util.List;

@Data
public class BookBestResult {

    private List<BookBestResponseDto> books;
    private int totalPage;
    private long totalCount;
    private int currentPage;
    private boolean isLastPage;

    public BookBestResult(List<BookBestResponseDto> books, int totalPage, long totalCount, int currentPage, boolean isLastPage) {
        this.books = books;
        this.totalPage = totalPage;
        this.totalCount = totalCount;
        this.currentPage = currentPage;
        this.isLastPage = isLastPage;
    }
}
