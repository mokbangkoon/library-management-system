package com.example.bookAPI.dto.book.shareAndFind;

import com.example.bookAPI.dto.Pagination;
import lombok.Data;

import java.util.List;

@Data
public class BookShareAndFindResult {

    private List<BookShareAndFindResponseDto> shareBooks;
    private Pagination sharePage;
    private List<BookShareAndFindResponseDto> findBooks;
    private Pagination findPage;

    public BookShareAndFindResult(List<BookShareAndFindResponseDto> shareBooks, Pagination sharePage, List<BookShareAndFindResponseDto> findBooks, Pagination findPage) {
        this.shareBooks = shareBooks;
        this.sharePage = sharePage;
        this.findBooks = findBooks;
        this.findPage = findPage;
    }
}
