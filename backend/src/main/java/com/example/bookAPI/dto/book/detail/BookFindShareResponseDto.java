package com.example.bookAPI.dto.book.detail;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigInteger;

@Getter
@AllArgsConstructor
public class BookFindShareResponseDto implements BookFindShareInterface{
    private Long shareCount;
    private Long findCount;
    private BigInteger isShare;
    private BigInteger isFind;
    private BigInteger isSharedForLooking;
    private BigInteger isFoundForShare;
}