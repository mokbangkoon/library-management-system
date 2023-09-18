package com.example.bookAPI.service.bookShare;

import com.example.bookAPI.domain.Book;
import com.example.bookAPI.domain.BookShare;
import com.example.bookAPI.domain.BookStatus;
import com.example.bookAPI.domain.Member;
import com.example.bookAPI.dto.Enum.BookState;
import com.example.bookAPI.dto.book.detail.BookFindShareInterface;
import com.example.bookAPI.dto.book.detail.BookFindShareResponseDto;
import com.example.bookAPI.repository.BookShareRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookShareService {
    private final BookShareRepository bookShareRepository;

    @Transactional
    public ResponseEntity saveBookShare(Optional<Member> member, Optional<Book> book, Long bookStatusId) {
        List<BookShare> existedBookShare = bookShareRepository.findTop1ByMemberIdAndBookId(member.get().getMemberId(), book.get().getBookId(), bookStatusId.intValue(), bookStatusId == 1 ? BookState.SHARED.getId() : bookStatusId == 3 ? BookState.LOOKING_FOR.getId(): 0);
        BookShare bookShare = new BookShare();
        BookStatus bookStatus = new BookStatus();
        if(existedBookShare.size() != 0) {
            if(bookStatusId != 0){
                existedBookShare.get(0).setDeleted(existedBookShare.get(0).isDeleted() ? false : true);
            } else {
                existedBookShare.get(0).setRequesterId(member.get());
            }
            bookShareRepository.save(existedBookShare.get(0));
        } else {
            bookStatus.setBookStatusId(bookStatusId);
            bookShare.setBook(book.get());
            if(bookStatusId == 1){
                bookShare.setRequesterId(member.get());
            } else if(bookStatusId == 3){
                bookShare.setSharerId(member.get());
            }
            bookShare.setBookStatus(bookStatus);
            bookShareRepository.save(bookShare);
        }
        return new ResponseEntity(HttpStatus.CREATED);
    }

    public BookFindShareInterface getFindShareBook(Long bookId, Long memberId) {
        BookFindShareInterface findAndShare = bookShareRepository.findFindAndShare(bookId, memberId);
        if(findAndShare == null){
            return new BookFindShareResponseDto(Long.valueOf(0), Long.valueOf(0), BigInteger.valueOf(0), BigInteger.valueOf(0), BigInteger.valueOf(0), BigInteger.valueOf(0));
        } else {
            return findAndShare;
        }
    }
}
