package com.example.bookAPI.dto.Enum;

import lombok.Getter;

@Getter
public enum CategoryType {
    ECONOMICS_MANAGEMENT(1, "경제/경영"),
    SELF_IMPROVEMENT(2, "자기계발"),
    POLITICS_SOCIETY(3, "정치/사회"),
    COMPUTER_IT(4, "컴퓨터/IT"),
    EMPLOYMENT_EXAMS(5, "취업/수험서"),
    TECHNOLOGY_ENGINEERING(6, "기술/공학"),
    MAGAZINE(7, "잡지"),
    POETRY_ESSAY(8, "시/에세이"),
    HUMANITIES(9, "인문"),
    HISTORY_CULTURE(10, "역사/문화"),
    FAMILY_PARENTING(11, "가정/육아"),
    HEALTH(12, "건강"),
    ART_POP_CULTURE(13,"예술/대중문화" ),
    TRAVEL (14,"여행" ),
    FOREIGN_LANGUAGE (15,"외국어" ),
    SCIENCE (16,"과학" ),
    CHILDREN_PRIMARY (17,"어린이 (초등)" ),
    HOBBY_PRACTICAL_SPORTS (18,"취미 /실용 /스포츠" ),
    NOVEL (19, "소설" ),
    TEENAGER (20, "청소년"),
    COMICS (21, "만화"),
    WESTERN_BOOKS (22, "서양도서");

    private final int id;
    private final String name;

    public int getId() {
        return id;
    }

    CategoryType(int id, String name) {
        this.id = id;
        this.name = name;
    }
}
