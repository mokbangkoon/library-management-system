package com.example.bookAPI.dto.book.search;

import com.example.bookAPI.dto.book.BookBaseResponseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class BookSearchResponseDto extends BookBaseResponseDto implements BookSearchListResponseDto {
    private Long shareCount;
    private Long findCount;

    public BookSearchResponseDto(Long id, String title, String writer, String publisher, String img) {
        super(id, title, writer, publisher, img);
    }

    public BookSearchResponseDto(Long id, String title, String writer,String publisher,  String img, Long shareCount, Long findCount) {
        super(id, title, writer, publisher, img);
        this.shareCount = shareCount;
        this.findCount = findCount;
    }
}
