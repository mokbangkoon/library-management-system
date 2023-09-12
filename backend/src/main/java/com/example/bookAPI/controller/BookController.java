package com.example.bookAPI.controller;

import com.example.bookAPI.dto.Enum.CategoryType;
import com.example.bookAPI.dto.Pagination;
import com.example.bookAPI.dto.book.best.BookBestResponseDto;
import com.example.bookAPI.dto.book.best.BookBestResult;
import com.example.bookAPI.dto.book.category.BookTeamCategoryResponseDto;
import com.example.bookAPI.dto.book.category.BookTeamCategoryResult;
import com.example.bookAPI.dto.book.count.BookCountPerCategoryResponseDto;
import com.example.bookAPI.dto.book.detail.BookDetailResponseDto;
import com.example.bookAPI.dto.book.purchase.BookPurchaseResponseDto;
import com.example.bookAPI.dto.book.purchase.BookPurchaseResult;
import com.example.bookAPI.dto.book.review.BookReviewResponseDto;
import com.example.bookAPI.dto.book.review.BookReviewResult;
import com.example.bookAPI.dto.book.save.BookSaveRequestDto;
import com.example.bookAPI.dto.book.search.BookSearchResponseDto;
import com.example.bookAPI.dto.book.search.BookSearchResult;
import com.example.bookAPI.dto.book.shareAndFind.BookShareAndFindResponseDto;
import com.example.bookAPI.dto.book.shareAndFind.BookShareAndFindResult;
import com.example.bookAPI.security.jwt.token.JwtProperties;
import com.example.bookAPI.security.jwt.util.JwtTokenizer;
import com.example.bookAPI.service.BookService;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Api(tags = "BookApiController", description = "책 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/books")
@CrossOrigin(origins = "http://localhost:5173") // 컨트롤러에서 설정
public class BookController {

    private final BookService bookService;
    private final JwtTokenizer jwtTokenizer;
    @Autowired
    private HttpServletRequest request;

    @Operation(summary = "책 검색", description = "책 통합(제목, 저자, 출판사, 소개 합침) 제목, 저자, 출판사, 소개로 검색한 책 리스트 반환")
    @GetMapping("/search")
    public BookSearchResult getBooksByTitle(
            @Parameter(description = "검색 필터", required = true, schema = @Schema(type = "integer", allowableValues = { "1", "2", "3", "4", "5" }), example = "1")
            @RequestParam(value = "searchFilter", defaultValue = "1") int searchFilter,
            @Parameter(description = "제목", required = true, example = "sql") @RequestParam(value = "title", defaultValue = "sql") String title,
            @Parameter(description = "조회 페이지", required = true, example = "1")  @RequestParam(value = "page", defaultValue = "1") int page,
            @Parameter(description = "조회 사이즈", required = true, example = "20")  @RequestParam(value = "size", defaultValue = "20") int size
    ){
        PageRequest pageable = PageRequest.of(page-1, size);
        Page<BookSearchResponseDto> resultPage = bookService.getBooksByTitle(searchFilter, title, pageable);
        return new BookSearchResult(resultPage.getContent(), resultPage.getTotalPages(), resultPage.getTotalElements(), resultPage.getNumber()+1, resultPage.isLast());
    }

    @Operation(summary = "가장 최근에 구매한 책", description = "최근 구매한 책 리스트 반환")
    @GetMapping("/purchased")
    public BookPurchaseResult getPurchasedBooks(
            @Parameter(description = "조회 페이지", example = "1")
            @RequestParam(value = "page", defaultValue = "1", required = false) int page,
            @Parameter(description = "조회 사이즈", example = "10")
            @RequestParam(value = "size", defaultValue = "10", required = false) int size,
            @Parameter(description ="API 타입 여부", example = "1", required = true)
            @RequestParam(value = "type", defaultValue = "1", required = true) int type
    ){
        PageRequest pageable;
        pageable = PageRequest.of(page-1, size, Sort.by(Sort.Direction.DESC, type==1 ? "createDateTime" : "create_date_time"));

        Page<BookPurchaseResponseDto> resultPage = bookService.getPurchasedBooks(pageable, type);
        return new BookPurchaseResult(resultPage.getContent(), resultPage.getTotalPages(), resultPage.getTotalElements(), resultPage.getNumber()+1, resultPage.isLast());
    }

    @Operation(summary = "베스트 책", description = "베스트 선정된 책 리스트 반환")
    @GetMapping("/best")
    public BookBestResult getBestBooks(
            @Parameter(description = "조회 페이지", example = "1")
            @RequestParam(value = "page", defaultValue = "1", required = false) int page,
            @Parameter(description = "조회 사이즈", example = "10")
            @RequestParam(value = "size", defaultValue = "10", required = false) int size,
            @Parameter(description ="API 타입 여부", example = "1", required = true)
            @RequestParam(value = "type", defaultValue = "1", required = true) int type
    ){
        PageRequest pageable;
        pageable = PageRequest.of(page-1, size);

        Page<BookBestResponseDto> resultPage = bookService.getBestBooks(pageable, type);
        return new BookBestResult(resultPage.getContent(), resultPage.getTotalPages(), resultPage.getTotalElements(), resultPage.getNumber()+1, resultPage.isLast());
    }

    @Operation(summary = "공유한 책과 찾는 책", description = "공유 및 찾는 책 리스트 반환")
    @GetMapping("/shareAndFind")
    public BookShareAndFindResult getShareAndFindBooks(
            @Parameter(description = "조회 페이지", example = "1")
            @RequestParam(value = "page", defaultValue = "1", required = false) int page,
            @Parameter(description = "조회 사이즈", example = "6")
            @RequestParam(value = "size", defaultValue = "6", required = false) int size,
            @Parameter(description ="API 타입 여부", example = "1", required = true)
            @RequestParam(value = "type", defaultValue = "1", required = true) int type
    ){
        PageRequest pageable;
        pageable = PageRequest.of(page-1, size);

        Page<BookShareAndFindResponseDto> sharePage = bookService.getShareBooks(pageable, type);
        Pagination sharePageInfo = new Pagination(sharePage.getTotalPages(), sharePage.getTotalElements(), sharePage.getNumber() + 1, sharePage.isLast());
        Page<BookShareAndFindResponseDto> findPage = bookService.getFindBooks(pageable, type);
        Pagination findPageInfo = new Pagination(findPage.getTotalPages(), findPage.getTotalElements(), findPage.getNumber() + 1, findPage.isLast());
        return new BookShareAndFindResult(sharePage.getContent(), sharePageInfo, findPage.getContent(), findPageInfo);
    }

    @Operation(summary = "최근 리뷰 달린 책", description = "최근 리뷰 받은 책 리스트 반환")
    @GetMapping("/review")
    public BookReviewResult getReviewBooks(
            @Parameter(description = "조회 페이지", example = "1")
            @RequestParam(value = "page", defaultValue = "1", required = false) int page,
            @Parameter(description = "조회 사이즈", example = "10")
            @RequestParam(value = "size", defaultValue = "10", required = false) int size,
            @Parameter(description ="API 타입 여부", example = "1", required = true)
            @RequestParam(value = "type", defaultValue = "1", required = true) int type
    ){
        PageRequest pageable;
        pageable = PageRequest.of(page-1, size);

        Page<BookReviewResponseDto> resultPage = bookService.getReviewBooks(pageable, type);
        return new BookReviewResult(resultPage.getContent(), resultPage.getTotalPages(), resultPage.getTotalElements(), resultPage.getNumber()+1, resultPage.isLast());
    }

    @Operation(summary = "팀 별 책 리스트 조회", description = "팀 별 등록한 책 리스트 반환")
    @GetMapping("/team")
    public BookTeamCategoryResult getBooksByTeam(
            @Parameter(name = "teamId", schema = @Schema(type = "Long", allowableValues = { "1", "2", "3", "4", "5", "6", "7" }),  required = true) @RequestParam(value = "teamId", defaultValue = "1") Long teamId,
            @Parameter(description = "조회 페이지", example = "1")  @RequestParam(value = "page", defaultValue = "1") int page,
            @Parameter(description = "조회 사이즈", example = "8")  @RequestParam(value = "size", defaultValue = "8") int size,
            @Parameter(description ="API 타입 여부", example = "1", required = true) @RequestParam(value = "type", defaultValue = "1", required = true) int type
    ){
        PageRequest pageable = PageRequest.of(page-1, size);
        Page<BookTeamCategoryResponseDto> resultPage = bookService.getBooksByTeam(teamId, pageable, type);
        return new BookTeamCategoryResult(resultPage.getContent(), resultPage.getTotalPages(), resultPage.getTotalElements(), resultPage.getNumber()+1, resultPage.isLast());
    }

    @Operation(summary = "카테고리 별 책 리스트 조회", description = "최 상위 카테고리로 책 리스트 반환")
    @GetMapping("/category/{categoryId}")
    public BookSearchResult getBooksByCategory(
            @Parameter(description = "카테고리 타입", required = true , schema = @Schema(type = "integer", allowableValues = {"1","2","3","4","5","6","7,","9","10","11","12","13","14","15","16","17","18","19","20","21","22"}), example = "1") @PathVariable(name = "categoryId", required = true) int categoryId,
            @Parameter(description = "서브 카테고리 명") @RequestParam(value = "subCategory", required = false) String subCategory,
            @Parameter(description = "조회 페이지", required = true, example = "0")  @RequestParam(value = "page", defaultValue = "1") int page,
            @Parameter(description = "조회 사이즈", required = true, example = "10")  @RequestParam(value = "size", defaultValue = "10") int size
    ){
        PageRequest pageable = PageRequest.of(page-1, size , Sort.by(Sort.Direction.DESC, "createDateTime"));
        Page<BookSearchResponseDto> resultPage = bookService.getBooksByCategory(categoryId, subCategory, pageable);
        return new BookSearchResult(resultPage.getContent(), resultPage.getTotalPages(), resultPage.getTotalElements(), resultPage.getNumber()+1, resultPage.isLast());
    }

    @Operation(summary = "카테고리 별 책 갯수 조회", description = "카테고리에 해당하는 책 전체 갯수 리스트 반환")
    @GetMapping("/category/count")
    public List<BookCountPerCategoryResponseDto> getBookCountPerCategory(){
        return bookService.getBookCountPerCategory();
    }

    @Operation(summary = "서브 카테고리 별 책 갯수 조회", description = "서브 카테고리에 해당하는 책 전체 갯수 리스트 반환")
    @GetMapping("/category/{categoryId}/subCategory/count")
    public List<BookCountPerCategoryResponseDto> getBookCountPerSubCategory(
            @Parameter(description = "카테고리 타입", required = true , schema = @Schema(type = "integer", allowableValues = {"1","2","3","4","5","6","7,","9","10","11","12","13","14","15","16","17","18","19","20","21","22"}), example = "1") @PathVariable(name = "categoryId", required = true) int categoryId
            ){
        return bookService.getBookCountPerSubCategory(categoryId);
    }

    @Operation(summary = "책 리스트 저장", description = "스크래핑으로 받은 책 리스트 저장")
    @PostMapping("/save")
    public void saveBooks(@RequestBody List<BookSaveRequestDto> books) {
        bookService.saveBooks(books);
    }


    @Operation(summary = "책 id 별 상세 조회", description = "책 id에 해당하는 책 객체 반환")
    @GetMapping("/{bookId}")
    public BookDetailResponseDto getBook(
            @Parameter(description = "책 id", required = true) @PathVariable(name = "bookId", required = true) Long bookId
            ) {
        String token = request.getHeader(JwtProperties.HEADER_STRING);
        Long memberId = token == null ? 0 : jwtTokenizer.getUserIdFromToken(token);
        return bookService.getBookById(bookId, memberId);
    }
}