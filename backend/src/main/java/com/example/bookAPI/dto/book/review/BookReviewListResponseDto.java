package com.example.bookAPI.dto.book.review;


import com.example.bookAPI.dto.book.BookListResponseDto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public interface BookReviewListResponseDto extends BookListResponseDto {
    String getContent();

    String getName();

    BigDecimal getRating();

    LocalDateTime getCreateDateTime();

}
