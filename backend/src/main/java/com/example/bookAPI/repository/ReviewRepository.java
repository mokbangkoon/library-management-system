package com.example.bookAPI.repository;

import com.example.bookAPI.domain.Review;
import com.example.bookAPI.dto.review.ReviewBookResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query(value = "SELECT new com.example.bookAPI.dto.review.ReviewBookResponseDto(r.content, r.member.name, r.rating, r.createDateTime) " +
            "FROM Review r " +
            "JOIN r.book b " +
            "WHERE b.bookId = :bookId")
    Page<ReviewBookResponseDto> getReviewsByBookId(@Param("bookId") Long bookId, PageRequest pageable);
}
