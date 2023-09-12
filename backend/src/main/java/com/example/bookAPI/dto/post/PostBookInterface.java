package com.example.bookAPI.dto.post;

import com.example.bookAPI.dto.Enum.PostState;

import java.time.LocalDateTime;

public interface PostBookInterface {
    String getTitle();
    String getName();
    String getContent();
    LocalDateTime getCreateDateTime();
    String getTags();

    String getStatus();
}
