package com.example.bookAPI.controller;

import com.example.bookAPI.domain.Book;
import com.example.bookAPI.domain.Member;
import com.example.bookAPI.dto.book.detail.BookFindShareInterface;
import com.example.bookAPI.dto.book.shareAndFind.BookShareRequestDto;
import com.example.bookAPI.security.jwt.token.JwtProperties;
import com.example.bookAPI.security.jwt.util.JwtTokenizer;
import com.example.bookAPI.service.BookService;
import com.example.bookAPI.service.MemberService;
import com.example.bookAPI.service.bookShare.BookShareService;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

@Api(tags = "BookShareApiController", description = "책 공유 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/book-share")
@CrossOrigin(origins = "http://localhost:5173") // 컨트롤러에서 설정
public class BookShareController {

    private final MemberService memberService;
    private final BookService bookService;
    private final BookShareService bookShareService;
    private final JwtTokenizer jwtTokenizer;
    @Autowired
    private HttpServletRequest request;

    @Operation(summary = "책 공유 및 찾기", description = "책 공유 및 찾기 등록")
    @PostMapping("")
    public ResponseEntity saveBookShare(@RequestBody BookShareRequestDto bookShareRequest) {
        String token = request.getHeader(JwtProperties.HEADER_STRING);
        Long memberId = jwtTokenizer.getUserIdFromToken(token);

        Optional<Member> optionalMember = memberService.getMember(memberId);
        Optional<Book> optionalBook = bookService.getBook(bookShareRequest.getBookId());

        if(optionalMember.isEmpty() || optionalBook.isEmpty()) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        return bookShareService.saveBookShare(optionalMember, optionalBook, bookShareRequest.getBookStatusId());
    }

    @Operation(summary = "책 id와 멤버 id별 공유, 찾기 정보", description = "책 id와 멤버 id별 공유, 찾기 정보 반환")
    @GetMapping("/{bookId}")
    public BookFindShareInterface saveBookShare(
            @Parameter(description = "책 id", required = true) @PathVariable(name = "bookId", required = true) Long bookId
    ) {
        String token = request.getHeader(JwtProperties.HEADER_STRING);
        Long memberId = token == null ? 0 : jwtTokenizer.getUserIdFromToken(token);
        return bookShareService.getFindShareBook(bookId, memberId);
    }
}