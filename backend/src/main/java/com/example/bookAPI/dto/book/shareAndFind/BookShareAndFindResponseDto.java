package com.example.bookAPI.dto.book.shareAndFind;

import com.example.bookAPI.dto.book.BookBaseResponseDto;
import com.example.bookAPI.dto.book.best.BookBestResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BookShareAndFindResponseDto extends BookBaseResponseDto {
    public BookShareAndFindResponseDto(Long id, String title, String writer, String img) {
        super(id, title, writer, img);
    }
}
