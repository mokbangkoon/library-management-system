package com.example.bookAPI.dto.book.best;

import com.example.bookAPI.dto.book.BookBaseResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BookBestResponseDto extends BookBaseResponseDto {
    public BookBestResponseDto(Long id, String title, String writer, String img) {
        super(id, title, writer, img);
    }
}
