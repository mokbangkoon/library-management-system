package com.example.bookAPI.controller;

import com.example.bookAPI.domain.Book;
import com.example.bookAPI.domain.Member;
import com.example.bookAPI.domain.Review;
import com.example.bookAPI.dto.review.ReviewBookResponseDto;
import com.example.bookAPI.dto.review.ReviewBookResult;
import com.example.bookAPI.dto.review.ReviewRequestDto;
import com.example.bookAPI.dto.review.ReviewResponseDto;
import com.example.bookAPI.security.jwt.token.JwtProperties;
import com.example.bookAPI.security.jwt.util.JwtTokenizer;
import com.example.bookAPI.service.BookService;
import com.example.bookAPI.service.MemberService;
import com.example.bookAPI.service.ReviewService;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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
@RequestMapping("/reviews")
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
        }
        Optional<Review> existedReview = reviewService.getReviewByMemberID(memberId, reviewRequestDto.getBook_id());
        if(existedReview.isPresent()){
            return new ResponseEntity(HttpStatus.CONFLICT);
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

    @Operation(summary = "책 별 리뷰 갯수 조회", description = "책에 달린 리뷰 리스트 반환")
    @GetMapping("/{bookId}")
    public ReviewBookResult getReviewsByBookId(
            @Parameter(description = "조회 페이지", required = true, example = "0")  @RequestParam(value = "page", defaultValue = "1") int page,
            @Parameter(description = "조회 사이즈", required = true, example = "10")  @RequestParam(value = "size", defaultValue = "10") int size,
            @Parameter(description = "책 id", required = true) @PathVariable(name = "bookId", required = true) Long bookId
            ){
        PageRequest pageable = PageRequest.of(page-1, size , Sort.by(Sort.Direction.DESC, "createDateTime"));
        Page<ReviewBookResponseDto> resultPage = reviewService.getReviewsByBookId(bookId, pageable);
        return new ReviewBookResult(resultPage.getContent(), resultPage.getTotalPages(), resultPage.getTotalElements(), resultPage.getNumber()+1, resultPage.isLast());
    }
}
