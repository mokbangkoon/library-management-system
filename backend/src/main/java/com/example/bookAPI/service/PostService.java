package com.example.bookAPI.service;


import com.example.bookAPI.dto.book.category.BookTeamCategoryResponseDto;
import com.example.bookAPI.dto.post.PostBookResponseDto;
import com.example.bookAPI.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostService {
     private final PostRepository postRepository;
    @Transactional(readOnly = true)
    public Page<PostBookResponseDto> getPostByPostTypeAndBookId(Long bookId, int postType, PageRequest pageable) {
        return postRepository.findPostByPostTypeAndBookId(bookId, postType == 1 ? "REPORT" : "STUDY", pageable).map(
                        post -> new PostBookResponseDto(
                                post.getTitle(),
                                post.getName(),
                                post.getTitle(),
                                post.getCreateDateTime(),
                                post.getTags(),
                                post.getStatus()
                        )
        );
    }
}
