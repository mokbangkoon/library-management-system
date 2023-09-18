package com.example.bookAPI.dto.Enum;

public enum BookState {
    SHARED(1,"공유 된"),
    SHARING(2, "공유 중"),
    LOOKING_FOR(3, "찾는 중");
    private final int id;
    private final String name;

    public int getId() {
        return id;
    }

    BookState(int id, String name) {
        this.id = id;
        this.name = name;
    }
}
