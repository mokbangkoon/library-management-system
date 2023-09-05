package com.example.bookAPI.dto.review;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewResponseDto {
    private Long memberId;
    private Long bookId;
    private String content;
    private BigDecimal rate;
}
