package com.example.bookAPI.controller;

import com.example.bookAPI.dto.post.PostBookResponseDto;
import com.example.bookAPI.dto.post.PostBookResult;
import com.example.bookAPI.service.PostService;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

@Api(tags = "PostApiController", description = "게시글 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/posts")
@CrossOrigin(origins = "http://localhost:5173") // 컨트롤러에서 설정
public class PostController {
    private final PostService postService;
    @Operation(summary = "게시글 조회", description = "타입에 따른 게시글(감상평, 스터디) 리스트 반환")
    @GetMapping("/{bookId}")
    public PostBookResult getPostByPostTypeAndBookId(
            @Parameter(description = "책 id", required = true) @PathVariable(name = "bookId", required = true) Long bookId,
            @Parameter(description = "게시글 타입 ", required = true, schema = @Schema(type = "int", allowableValues = { "1", "2"}), example = "1") int postType,
            @Parameter(description = "조회 페이지", required = true, example = "1")  @RequestParam(value = "page", defaultValue = "1") int page,
            @Parameter(description = "조회 사이즈", required = true, example = "20")  @RequestParam(value = "size", defaultValue = "20") int size
    ){
        PageRequest pageable = PageRequest.of(page-1, size);
        Page<PostBookResponseDto> resultPage = postService.getPostByPostTypeAndBookId(bookId, postType, pageable);
        return new PostBookResult(resultPage.getContent(), resultPage.getTotalPages(), resultPage.getTotalElements(), resultPage.getNumber()+1, resultPage.isLast());
    }
}
