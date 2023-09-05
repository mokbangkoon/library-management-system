package com.example.bookAPI.dto.book.best;

import com.example.bookAPI.dto.book.BookBaseResponseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BookBestResponseDto extends BookBaseResponseDto implements BookBestListResponseDto {
    private Long shareCount;
    private Long findCount;

    public BookBestResponseDto(Long id, String title, String writer, String publisher, String img) {
        super(id, title, writer, publisher, img);
    }

    public BookBestResponseDto(Long id, String title, String writer, String publisher, String img, Long shareCount, Long findCount) {
        super(id, title, writer, publisher, img);
        this.shareCount = shareCount;
        this.findCount = findCount;
    }
}
