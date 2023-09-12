package com.example.bookAPI.dto.Enum;

public enum PostType {
    REPORT(1, "감성평"),
    STUDY(2, "감성평");

    private final int id;
    private final String name;
    public int getId() {
        return id;
    }
    PostType(int id, String name) {
        this.id = id;
        this.name = name;
    }
}
