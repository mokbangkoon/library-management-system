package com.example.bookAPI.dto.book.category;

import com.example.bookAPI.dto.Pagination;
import com.example.bookAPI.dto.book.review.BookReviewResponseDto;
import lombok.Data;

import java.util.List;

@Data
public class BookTeamCategoryResult {
    private List<BookTeamCategoryResponseDto> books;
    private int totalPage;
    private long totalCount;
    private int currentPage;
    private boolean isLastPage;

    public BookTeamCategoryResult(List<BookTeamCategoryResponseDto> books, int totalPage, long totalCount, int currentPage, boolean isLastPage) {
        this.books = books;
        this.totalPage = totalPage;
        this.totalCount = totalCount;
        this.currentPage = currentPage;
        this.isLastPage = isLastPage;
    }
}
