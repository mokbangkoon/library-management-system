package com.example.bookAPI.repository;

import com.example.bookAPI.domain.BookShare;
import com.example.bookAPI.dto.book.detail.BookFindShareInterface;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookShareRepository extends JpaRepository<BookShare, Long> {
    @Query(value = "SELECT bs FROM BookShare bs " +
            "WHERE bs.book.bookId = :bookId AND " +
            "((:bookStatusId = 0 AND bs.bookStatus.bookStatusId = 3) OR (:bookStatusId != 0 AND bs.bookStatus.bookStatusId = :bookStatusId)) AND " +
            "((:status = 1 AND bs.requesterId.memberId = :memberId) OR (:status = 3 AND bs.sharerId.memberId = :memberId) OR (:status = 0 AND bs.requesterId.memberId IS NUll)) " +
            "ORDER BY bs.createDateTime ASC "
    )
    List<BookShare> findTop1ByMemberIdAndBookId(@Param("memberId") Long memberId, @Param("bookId") Long bookId, @Param("bookStatusId") int bookStatusId, @Param("status") int status);

    @Query(value = "SELECT COUNT(CASE WHEN bs.book_status_id = 3 THEN bs.sharer_id ELSE NULL END) AS shareCount, " +
            "COUNT(CASE WHEN bs.book_status_id  = 1 THEN bs.requester_id ELSE NULL END) AS findCount, " +
            "MAX(CASE WHEN bs.sharer_id = :memberId AND bs.requester_id IS NULL AND  (bs.is_deleted = false OR bs.is_deleted IS NULL) THEN true ELSE false END) AS isShare, " +
            "MAX(CASE WHEN bs.requester_id = :memberId AND bs.sharer_id IS NULL AND (bs.is_deleted = false OR bs.is_deleted IS NULL) THEN true ELSE false END) AS isFind, " +
            "MAX(CASE WHEN bs.requester_id = :memberId AND bs.sharer_id IS NOT NULL THEN true ELSE false END) AS isSharedForLooking, " +
            "MAX(CASE WHEN bs.sharer_id = :memberId AND bs.requester_id IS NOT NULL THEN true ELSE false END) AS isFoundForShare " +
            "FROM book_share bs " +
            "WHERE bs.book_id = :bookId " +
            "AND (bs.is_deleted = false OR bs.is_deleted IS NULL) " +
            "GROUP BY bs.book_id" , nativeQuery = true
    )
    BookFindShareInterface findFindAndShare(@Param("bookId") Long bookId, @Param("memberId") Long memberId);
}
