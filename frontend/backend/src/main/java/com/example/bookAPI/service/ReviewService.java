package com.example.bookAPI.service;

import com.example.bookAPI.domain.Review;
import com.example.bookAPI.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
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
}
