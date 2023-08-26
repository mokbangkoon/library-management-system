package com.example.bookAPI.dto.book;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookPurchaseResponseDto {
    private Long id;
    private String title;
    private String writer;
    private String img;
    private String categories;
}
