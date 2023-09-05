package com.example.bookAPI.dto.book.purchase;


public interface BookPurchaseListResponseDto {
     Long getId();
     String getTitle();
     String getWriter();
     String getImg();
     String getCategories();
     Long getShareCount();
     Long getFindCount();
}
