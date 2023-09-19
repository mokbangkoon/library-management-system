package com.example.bookAPI.dto.book.detail;

import java.math.BigInteger;

public interface BookFindShareInterface {
    Long getShareCount();
    Long getFindCount();
    BigInteger getIsShare();
    BigInteger getIsFind();
    BigInteger getIsSharedForLooking();
    BigInteger getIsFoundForShare();
}

