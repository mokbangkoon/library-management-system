package com.example.bookAPI.dto.review;

import lombok.Data;

import java.util.List;

@Data
public class ReviewBookResult {
    private List<ReviewBookResponseDto> reviews;
    private int totalPage;
    private long totalCount;
    private int currentPage;
    private boolean isLastPage;

    public ReviewBookResult(List<ReviewBookResponseDto> reviews, int totalPage, long totalCount, int currentPage, boolean isLastPage) {
        this.reviews = reviews;
        this.totalPage = totalPage;
        this.totalCount = totalCount;
        this.currentPage = currentPage;
        this.isLastPage = isLastPage;
    }
}
