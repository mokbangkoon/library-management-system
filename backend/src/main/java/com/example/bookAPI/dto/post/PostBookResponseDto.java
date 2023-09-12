package com.example.bookAPI.dto.post;

import com.example.bookAPI.dto.Enum.PostState;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class PostBookResponseDto implements PostBookInterface {
    private String title;
    private String name;
    private String content;
    private LocalDateTime createDateTime;
    private String tags;
    private String status;
    public PostBookResponseDto(String title, String name, String content, LocalDateTime createDateTime, String tags, String status) {
        this.title = title;
        this.name = name;
        this.content = content;
        this.createDateTime = createDateTime;
        this.tags = tags;
        this.status = status;
    }
}
