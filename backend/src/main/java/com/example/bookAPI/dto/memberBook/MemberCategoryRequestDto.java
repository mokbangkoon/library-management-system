package com.example.bookAPI.dto.memberBook;

import com.example.bookAPI.dto.Enum.CategoryType;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class MemberCategoryRequestDto {
    @ApiModelProperty(value = "카테고리 id", example = "1")
    private List<CategoryType> categoryTypes;
}