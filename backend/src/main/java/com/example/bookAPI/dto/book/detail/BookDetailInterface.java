package com.example.bookAPI.dto.book.detail;
import com.example.bookAPI.dto.book.purchase.BookPurchaseListResponseDto;
import com.example.bookAPI.dto.book.review.BookReviewListResponseDto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public interface BookDetailInterface extends BookPurchaseListResponseDto {
    String getSubtitle();
    Double getAvgRating();
    Long getReviewCount();
    String getPublishDate();
    int getCount();
    String getDetailNum();
    String getIntroduce();
    Boolean getIsEBook();
    Boolean getIsShare();
    Boolean getIsFind();
}

