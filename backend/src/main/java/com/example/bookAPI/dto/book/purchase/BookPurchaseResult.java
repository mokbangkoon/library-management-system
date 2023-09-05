package com.example.bookAPI.dto.book.purchase;

import lombok.Data;

import java.util.List;

@Data
public class BookPurchaseResult {
    private List<BookPurchaseResponseDto> books;
    private int totalPage;
    private long totalCount;
    private int currentPage;
    private boolean isLastPage;

    public BookPurchaseResult(List<BookPurchaseResponseDto> books, int totalPage, long totalCount, int currentPage, boolean isLastPage) {
        this.books = books;
        this.totalPage = totalPage;
        this.totalCount = totalCount;
        this.currentPage = currentPage;
        this.isLastPage = isLastPage;
    }
}
