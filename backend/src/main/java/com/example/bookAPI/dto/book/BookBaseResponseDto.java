package com.example.bookAPI.dto.book;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public abstract class BookBaseResponseDto {
    private Long id;
    private String title;
    private String writer;
    private String publisher;
    private String img;
}
