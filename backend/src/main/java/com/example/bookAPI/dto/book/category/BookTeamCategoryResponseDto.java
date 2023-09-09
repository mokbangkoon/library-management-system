package com.example.bookAPI.dto.book.category;

import com.example.bookAPI.dto.book.BookBaseResponseDto;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BookTeamCategoryResponseDto extends BookBaseResponseDto implements BookTeamCategoryListResponseDto{
    private Long shareCount;
    private Long findCount;

    public BookTeamCategoryResponseDto(Long id, String title, String writer, String publisher, String img) {
        super(id, title, writer, publisher, img);
    }

    public BookTeamCategoryResponseDto(Long id, String title, String writer, String publisher, String img, Long shareCount, Long findCount) {
        super(id, title, writer, publisher, img);
        this.shareCount = shareCount;
        this.findCount = findCount;
    }
}
