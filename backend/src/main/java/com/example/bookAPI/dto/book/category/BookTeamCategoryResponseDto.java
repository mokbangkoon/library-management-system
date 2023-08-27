package com.example.bookAPI.dto.book.category;

import com.example.bookAPI.dto.book.BookBaseResponseDto;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BookTeamCategoryResponseDto extends BookBaseResponseDto {
    public BookTeamCategoryResponseDto(Long id, String title, String writer, String img) {
        super(id, title, writer, img);
    }
}
