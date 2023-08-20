package com.example.bookAPI.controller;

import com.example.bookAPI.domain.Book;
import com.example.bookAPI.domain.Member;
import com.example.bookAPI.domain.Review;
import com.example.bookAPI.dto.review.ReviewRequestDto;
import com.example.bookAPI.dto.review.ReviewResponseDto;
import com.example.bookAPI.security.jwt.token.JwtProperties;
import com.example.bookAPI.security.jwt.util.JwtTokenizer;
import com.example.bookAPI.service.BookService;
import com.example.bookAPI.service.MemberService;
import com.example.bookAPI.service.ReviewService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.Optional;

@Api(tags = "ReviewApiController", description = "리뷰 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/review")
@Validated
public class ReviewController {

    private final ReviewService reviewService;
    private final BookService bookService;
    private final MemberService memberService;
    private final JwtTokenizer jwtTokenizer;
    @Autowired
    private HttpServletRequest request;


    @PostMapping("")
    public ResponseEntity saveReview(@RequestBody @Valid ReviewRequestDto reviewRequestDto, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }

        String token = request.getHeader(JwtProperties.HEADER_STRING);

        Long memberId = jwtTokenizer.getUserIdFromToken(token);

        Optional<Member> optionalMember = memberService.getMember(memberId);
        Optional<Book> optionalBook = bookService.getBook(reviewRequestDto.getBook_id());
        if(optionalMember.isEmpty() || optionalBook.isEmpty()) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        } else {
            Member member = optionalMember.get();
            Book book = optionalBook.get();

            Review review = new Review();

            review.setMember(member);
            review.setBook(book);
            review.setContent(reviewRequestDto.getContent());
            review.setRating(reviewRequestDto.getRating());

            Review saveReview = reviewService.saveReview(review);

            ReviewResponseDto reviewResponseDto = ReviewResponseDto.builder()
                    .bookId(book.getBookId())
                    .content(saveReview.getContent())
                    .rate(saveReview.getRating())
                    .build();

            return new ResponseEntity(reviewResponseDto, HttpStatus.CREATED);
        }
    }
}
