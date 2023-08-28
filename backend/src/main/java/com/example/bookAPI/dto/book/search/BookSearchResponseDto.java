package com.example.bookAPI.dto.book.search;

import com.example.bookAPI.dto.book.BookBaseResponseDto;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BookSearchResponseDto extends BookBaseResponseDto {
    public BookSearchResponseDto(Long id, String title, String writer, String publisher, String img) {
        super(id, title, writer, publisher, img);
    }
}
