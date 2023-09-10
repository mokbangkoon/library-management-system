package com.example.bookAPI.service;

import com.example.bookAPI.domain.Book;
import com.example.bookAPI.domain.Category;
import com.example.bookAPI.dto.Enum.CategoryType;
import com.example.bookAPI.dto.book.best.BookBestResponseDto;
import com.example.bookAPI.dto.book.category.BookTeamCategoryResponseDto;
import com.example.bookAPI.dto.book.count.BookCountPerCategoryResponseDto;
import com.example.bookAPI.dto.book.detail.BookDetailResponseDto;
import com.example.bookAPI.dto.book.purchase.BookPurchaseResponseDto;
import com.example.bookAPI.dto.book.review.BookReviewResponseDto;
import com.example.bookAPI.dto.book.save.BookSaveRequestDto;
import com.example.bookAPI.dto.book.search.BookSearchResponseDto;
import com.example.bookAPI.dto.book.shareAndFind.BookShareAndFindResponseDto;
import com.example.bookAPI.repository.BookRepository;
import com.example.bookAPI.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookService {
    private final BookRepository bookRepository;
    private final CategoryRepository categoryRepository;
    @Transactional
    public void saveBooks(List<BookSaveRequestDto> bookSaveRequestDtos) {
        for (BookSaveRequestDto bookRequestDto : bookSaveRequestDtos) {
            Book book = createBook(bookRequestDto);

            Optional<Book> existedBook = bookRepository.findByTitle(bookRequestDto.getTitle());
            if (existedBook.isPresent()) {
                Book existBook = existedBook.get();
                existBook.setCount(existBook.getCount() + 1);
            } else {
                bookRepository.save(book);
            }
        }
    }

    private Book createBook(BookSaveRequestDto bookSaveRequestDto) {
        List<String> categoryName = List.of(bookSaveRequestDto.getCategory().split(","));
        Category category = getCategory(categoryName);
        Book book = new Book();
        book.setTitle(bookSaveRequestDto.getTitle());
        book.setSubtitle(bookSaveRequestDto.getSubTitle());
        book.setImg(bookSaveRequestDto.getImg());
        book.setWriter(bookSaveRequestDto.getWriter());
        book.setPublisher(bookSaveRequestDto.getPublisher());
        book.setPublishDate(bookSaveRequestDto.getPublishDate());
        book.setDetailNum(bookSaveRequestDto.getDetailNum());
        book.setEbook(bookSaveRequestDto.isEbook());
        book.setIntroduce(bookSaveRequestDto.getIntroduce());
        book.setCount(1);
        book.setCategory(category);
        return book;
    }

    private Category getCategory(List<String> categoryNames) {
        Category parentCategory = null;
        for (String categoryName : categoryNames) {
            Category category = categoryRepository.findByName(categoryName);

            if(category == null){
                category = new Category(categoryName);
            }
            if (parentCategory != null) {
                category.setParentCategory(parentCategory);
            }
            categoryRepository.save(category);
            parentCategory = category;
        }
        return parentCategory;
    }

    @Transactional(readOnly = true)
    public Page<BookSearchResponseDto> getBooksByTitle(int searchFilter, String title, Pageable pageable) {
        return bookRepository.findBookListBySearch(searchFilter, title, pageable).map(
                book -> new BookSearchResponseDto(
                        book.getId(),
                        book.getTitle(),
                        book.getWriter(),
                        book.getPublisher(),
                        book.getImg(),
                        book.getShareCount(),
                        book.getFindCount()
                ));
    }

    @Transactional(readOnly = true)
    public Optional<Book> getBook(Long bookId) {
        return bookRepository.findById(bookId);
    }

    @Transactional(readOnly = true)
    public Page<BookPurchaseResponseDto> getPurchasedBooks(Pageable pageable, int type) {
        if (type == 1) {
            return bookRepository.findBookMainByPurchasedOrder(pageable);
        } else {
            return bookRepository.findBookListByPurchasedOrder(pageable)
                    .map(
                            book -> new BookPurchaseResponseDto(
                                    book.getId(),
                                    book.getTitle(),
                                    book.getWriter(),
                                    book.getImg(),
                                    book.getCategories(),
                                    book.getPublisher(),
                                    book.getShareCount(),
                                    book.getFindCount()
                            )
                    );
        }
    }

    @Transactional(readOnly = true)
    public Page<BookBestResponseDto> getBestBooks(PageRequest pageable, int type) {
        if (type == 1) {
            return bookRepository.findMainBookByBestOrder(pageable);
        } else {
            return bookRepository.findListBookByBestOrder(pageable).map(
                    book -> new BookBestResponseDto(
                            book.getId(),
                            book.getTitle(),
                            book.getWriter(),
                            book.getPublisher(),
                            book.getImg(),
                            book.getShareCount(),
                            book.getFindCount()
                    )
            );
        }
    }

    @Transactional(readOnly = true)
    public Page<BookShareAndFindResponseDto> getShareBooks(PageRequest pageable, int type) {
        if (type == 1) {
            return bookRepository.findMainBookByShared(pageable);
        } else {
            return bookRepository.findListBookByShared(pageable).map(
                    book -> new BookShareAndFindResponseDto(
                            book.getId(),
                            book.getTitle(),
                            book.getWriter(),
                            book.getPublisher(),
                            book.getImg(),
                            book.getShareCount(),
                            book.getFindCount()
                    )
            );
        }
    }

    @Transactional(readOnly = true)
    public Page<BookShareAndFindResponseDto> getFindBooks(PageRequest pageable, int type) {
        if (type == 1) {
            return bookRepository.findMainBookByFound(pageable);
        } else {
            return bookRepository.findListBookByFound(pageable).map(
                    book -> new BookShareAndFindResponseDto(
                            book.getId(),
                            book.getTitle(),
                            book.getWriter(),
                            book.getPublisher(),
                            book.getImg(),
                            book.getShareCount(),
                            book.getFindCount()
                    )
            );
        }
    }

    @Transactional(readOnly = true)
    public Page<BookReviewResponseDto> getReviewBooks(PageRequest pageable, int type) {
        if (type == 1) {
            return bookRepository.findMainBookByReviews(pageable);
        } else {
            return bookRepository.findListBookByReviews(pageable).map(
                    book -> new BookReviewResponseDto(
                            book.getId(),
                            book.getTitle(),
                            book.getWriter(),
                            book.getPublisher(),
                            book.getImg(),
                            book.getShareCount(),
                            book.getFindCount(),
                            book.getContent(),
                            book.getName(),
                            book.getRating(),
                            book.getCreateDateTime()
                    )
            );
        }
    }

    @Transactional(readOnly = true)
    public Page<BookTeamCategoryResponseDto> getBooksByTeam(Long teamId, PageRequest pageable, int type) {
        if (type == 1) {
            return bookRepository.findMainBookByTeamCategory(teamId, pageable);
        } else {
            return bookRepository.findListBookByTeamCategory(teamId, pageable).map(
                    book -> new BookTeamCategoryResponseDto(
                            book.getId(),
                            book.getTitle(),
                            book.getWriter(),
                            book.getPublisher(),
                            book.getImg(),
                            book.getShareCount(),
                            book.getFindCount()
                    )
            );

        }
    }

    public String getCategoryName(int id) {
        for (CategoryType ct : CategoryType.values()) {
            if (ct.getId() == id) {
                return ct.getName();
            }
        }
        return null;
    }

    public Page<BookSearchResponseDto> getBooksByCategory(int categoryId, String subCategory, Pageable pageable) {
        String categoryName = getCategoryName(categoryId);
        return bookRepository.findByCategory(categoryName, subCategory, pageable);
    }

    public List<BookCountPerCategoryResponseDto> getBookCountPerCategory() {
        return bookRepository.countByCategory();
    }

    public List<BookCountPerCategoryResponseDto> getBookCountPerSubCategory(int categoryId) {
        String categoryName = getCategoryName(categoryId);
        return bookRepository.countBySubCategory(categoryName);
    }

    public BookDetailResponseDto getBookById(Long bookId, Long memberId) {
        return bookRepository.findByIdAndMemberId(bookId, memberId);
    }
}