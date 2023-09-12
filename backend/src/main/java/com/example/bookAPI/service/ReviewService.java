package com.example.bookAPI.service;

import com.example.bookAPI.domain.Review;
import com.example.bookAPI.dto.review.ReviewBookResponseDto;
import com.example.bookAPI.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;

    @Transactional
    public Review saveReview(Review review) {
        Review saveReview = reviewRepository.save(review);
        return saveReview;
    }
    @Transactional(readOnly = true)
    public Page<ReviewBookResponseDto> getReviewsByBookId(Long bookId, PageRequest pageable) {
        return reviewRepository.getReviewsByBookId(bookId, pageable);
    }
}
