package com.example.bookAPI.dto.review;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class ReviewBookResponseDto {
    private String content;
    private String name;
    private BigDecimal rating;
    private LocalDateTime createDateTime;

    public ReviewBookResponseDto(String content, String name, BigDecimal rating, LocalDateTime createDateTime) {
        this.content = content;
        this.name = name;
        this.rating = rating;
        this.createDateTime = createDateTime;
    }
}
