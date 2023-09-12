package com.example.bookAPI.dto.post;

import com.example.bookAPI.dto.review.ReviewBookResponseDto;
import lombok.Data;

import java.util.List;

@Data
public class PostBookResult {
    private List<PostBookResponseDto> posts;
    private int totalPage;
    private long totalCount;
    private int currentPage;
    private boolean isLastPage;

    public PostBookResult(List<PostBookResponseDto> posts, int totalPage, long totalCount, int currentPage, boolean isLastPage) {
        this.posts = posts;
        this.totalPage = totalPage;
        this.totalCount = totalCount;
        this.currentPage = currentPage;
        this.isLastPage = isLastPage;
    }
}
