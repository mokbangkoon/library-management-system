package com.example.bookAPI.dto.Enum;

public enum PostState {
    RECRUITMENT_IN_PROGRESS(1, "모집 중"),
    RECRUITMENT_COMPLETED(2, "모집 완료");

    private final int id;
    private final String name;

    public int getId() {
        return id;
    }

    PostState(int id, String name) {
        this.id = id;
        this.name = name;
    }
}
