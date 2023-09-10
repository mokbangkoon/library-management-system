package com.example.bookAPI.repository;

import com.example.bookAPI.domain.Book;
import com.example.bookAPI.dto.book.best.BookBestListResponseDto;
import com.example.bookAPI.dto.book.best.BookBestResponseDto;
import com.example.bookAPI.dto.book.count.BookCountPerCategoryResponseDto;
import com.example.bookAPI.dto.book.category.BookTeamCategoryResponseDto;
import com.example.bookAPI.dto.book.detail.BookDetailResponseDto;
import com.example.bookAPI.dto.book.purchase.BookPurchaseListResponseDto;
import com.example.bookAPI.dto.book.purchase.BookPurchaseResponseDto;
import com.example.bookAPI.dto.book.review.BookReviewListResponseDto;
import com.example.bookAPI.dto.book.review.BookReviewResponseDto;
import com.example.bookAPI.dto.book.search.BookSearchListResponseDto;
import com.example.bookAPI.dto.book.search.BookSearchResponseDto;
import com.example.bookAPI.dto.book.shareAndFind.BookListShareAndFindResponseDto;
import com.example.bookAPI.dto.book.shareAndFind.BookShareAndFindResponseDto;
import com.example.bookAPI.dto.book.category.BookTeamCategoryListResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BookRepository extends JpaRepository<Book,Long> {
    Optional<Book> findByTitle(String title);

    @Query(value = "SELECT b.book_id, b.title, b.writer, b.publisher, b.img, " +
            "COUNT(bs.sharer_id) AS shareCount, " +
            "COUNT(bs.requester_id) AS findCount " +
            "FROM book b " +
            "LEFT JOIN book_share AS bs ON bs.book_id = b.book_id " +
            "WHERE (:searchFilter= 1 AND b.title LIKE %:title% OR b.writer LIKE %:title% OR b.publisher LIKE %:title% OR b.introduce LIKE %:title%) OR " +
            "(:searchFilter = 2 AND b.title LIKE %:title%) OR " +
            "(:searchFilter = 3 AND b.writer LIKE %:title%) OR " +
            "(:searchFilter = 4 AND b.publisher LIKE %:title%) OR " +
            "(:searchFilter = 5 AND b.introduce LIKE %:title%) " +
            "GROUP BY b.book_id", nativeQuery = true
    )
    Page<BookSearchListResponseDto> findBookListBySearch(@Param("searchFilter") int searchFilter, @Param("title") String title, Pageable pageable);

    @Query(value = "SELECT new com.example.bookAPI.dto.book.purchase.BookPurchaseResponseDto(" +
            "b.bookId, " +
            "b.title, " +
            "b.writer, " +
            "b.img, " +
            "CONCAT(main.name, ' > ', sub.name, ' > ', detail.name)) " +
            "FROM Book b " +
            "JOIN b.category detail " +
            "LEFT OUTER JOIN detail.parentCategory sub " +
            "LEFT OUTER JOIN sub.parentCategory main "
    )
    Page<BookPurchaseResponseDto> findBookMainByPurchasedOrder(Pageable pageable);

    @Query(value = "SELECT " +
            "b.book_id AS id, " +
            "b.title, " +
            "b.writer, " +
            "b.img, " +
            "CONCAT(c.name, ' > ', sub.name, ' > ', detail.name) AS categories, " +
            "b.publisher, " +
            "COUNT(bs.sharer_id) AS shareCount, " +
            "COUNT(bs.requester_id) AS findCount " +
            "FROM book b " +
            "LEFT JOIN category AS detail ON detail.category_id = b.category_id " +
            "LEFT JOIN category AS sub ON sub.category_id = detail.parent_category_id " +
            "LEFT JOIN category AS c ON c.category_id = sub.parent_category_id " +
            "LEFT JOIN book_share AS bs ON bs.book_id = b.book_id " +
            "GROUP BY b.book_id", nativeQuery = true
    )
    Page<BookPurchaseListResponseDto> findBookListByPurchasedOrder(Pageable pageable);

    @Query(value = "SELECT new com.example.bookAPI.dto.book.best.BookBestResponseDto(b.bookId, b.title, b.writer, b.publisher, b.img) " +
            "FROM Book b " +
            "LEFT JOIN b.reviews r " +
            "JOIN b.views v " +
            "GROUP BY b.bookId " +
            "ORDER BY (count(distinct v.viewId) * 4 + avg (r.rating) * 6) DESC"
    )
    Page<BookBestResponseDto> findMainBookByBestOrder(PageRequest pageable);

    @Query(value = "SELECT b.book_id AS id, b.title, b.writer, b.publisher, b.img, " +
            "COUNT(bs.sharer_id) AS shareCount, " +
            "COUNT(bs.requester_id) AS findCount " +
            "FROM book b " +
            "LEFT JOIN review r ON r.book_id = b.book_id " +
            "INNER JOIN view v ON v.book_id = b.book_id " +
            "LEFT JOIN book_share AS bs ON bs.book_id = b.book_id " +
            "GROUP BY b.book_id " +
            "ORDER BY (count(distinct v.view_id) * 4 + avg (r.rating) * 6) DESC", nativeQuery = true
    )
    Page<BookBestListResponseDto> findListBookByBestOrder(PageRequest pageable);

    @Query(value = "SELECT new com.example.bookAPI.dto.book.shareAndFind.BookShareAndFindResponseDto(b.bookId, b.title, b.writer, b.publisher, b.img) " +
            "FROM Book b " +
            "JOIN b.bookShares bs " +
            "WHERE bs.bookStatus = 1"
    )
    Page<BookShareAndFindResponseDto> findMainBookByShared(PageRequest pageable);

    @Query(value = "SELECT b.book_id AS id, b.title, b.writer, b.publisher, b.img, " +
            "COUNT(bs.sharer_id) AS shareCount, " +
            "COUNT(bs.requester_id) AS findCount " +
            "FROM book b " +
            "LEFT JOIN book_share AS bs ON bs.book_id = b.book_id " +
            "WHERE bs.book_status_id = 1 " +
            "GROUP BY b.book_id " , nativeQuery = true
    )
    Page<BookListShareAndFindResponseDto> findListBookByShared(PageRequest pageable);

    @Query(value = "SELECT new com.example.bookAPI.dto.book.shareAndFind.BookShareAndFindResponseDto(b.bookId, b.title, b.writer, b.publisher, b.img) " +
            "FROM Book b " +
            "JOIN b.bookShares bs " +
            "WHERE bs.bookStatus = 3"
    )
    Page<BookShareAndFindResponseDto> findMainBookByFound(PageRequest pageable);

    @Query(value = "SELECT b.book_id AS id, b.title, b.writer, b.publisher, b.img, " +
            "COUNT(bs.sharer_id) AS shareCount, " +
            "COUNT(bs.requester_id) AS findCount " +
            "FROM book b " +
            "LEFT JOIN book_share AS bs ON bs.book_id = b.book_id " +
            "WHERE bs.book_status_id = 3 " +
            "GROUP BY b.book_id " , nativeQuery = true
    )
    Page<BookReviewListResponseDto> findListBookByFound(PageRequest pageable);
    
    @Query(value = "SELECT new com.example.bookAPI.dto.book.review.BookReviewResponseDto(b.bookId, b.title, b.writer, b.publisher, b.img, " +
            "MIN(r.content), " +
            "MIN(r.member.name)," +
            "MIN(r.rating)," +
            "MIN(r.createDateTime)) " +
            "FROM Book b " +
            "JOIN b.reviews r " +
            "GROUP BY b.bookId " +
            "ORDER BY MIN(r.createDateTime) desc"
    )
    Page<BookReviewResponseDto> findMainBookByReviews(PageRequest pageable);


    @Query(value = "SELECT b.book_id AS id, b.title, b.writer, b.publisher, b.img, " +
            "COUNT(bs.sharer_id) AS shareCount, " +
            "COUNT(bs.requester_id) AS findCount, " +
            "MIN(r.content) AS content,  " +
            "MIN(m.name) AS name," +
            "MIN(r.rating) AS rating," +
            "MAX(r.create_date_time) AS createDateTime " +
            "FROM book b " +
            "INNER JOIN review AS r ON r.book_id = b.book_id " +
            "INNER JOIN member AS m ON m.member_id = r.member_id " +
            "LEFT JOIN book_share AS bs ON bs.book_id = b.book_id " +
            "GROUP BY b.book_id " +
            "ORDER BY MAX(r.create_date_time) DESC", nativeQuery = true
    )
    Page<BookReviewListResponseDto> findListBookByReviews(PageRequest pageable);


    @Query(value = "SELECT new com.example.bookAPI.dto.book.category.BookTeamCategoryResponseDto(b.bookId, b.title, b.writer, b.publisher, b.img) " +
            "FROM Book b " +
            "JOIN b.memberBooks mb " +
            "JOIN mb.member m " +
            "WHERE m.team.teamId = :teamId " +
            "GROUP BY b.bookId "
    )
    Page<BookTeamCategoryResponseDto> findMainBookByTeamCategory(@Param("teamId") Long teamId, PageRequest pageable);

    @Query(value = "SELECT b.book_id AS id, b.title, b.writer, b.publisher, b.img, " +
            "COUNT(bs.sharer_id) AS shareCount, " +
            "COUNT(bs.requester_id) AS findCount " +
            "FROM book b " +
            "INNER JOIN member_book AS mb ON mb.book_id = b.book_id " +
            "INNER JOIN member AS m ON m.member_id = mb.member_id " +
            "LEFT JOIN book_share AS bs ON bs.book_id = b.book_id " +
            "WHERE m.team_id = :teamId " +
            "GROUP BY b.book_id ", nativeQuery = true
    )
    Page<BookTeamCategoryListResponseDto> findListBookByTeamCategory(@Param("teamId") Long teamId, PageRequest pageable);

    @Query(value = "SELECT new com.example.bookAPI.dto.book.search.BookSearchResponseDto(b.bookId, b.title, b.writer, b.publisher, b.img) " +
            "FROM Book b " +
            "LEFT JOIN b.category detail "+
            "LEFT JOIN detail.parentCategory sub "+
            "LEFT JOIN sub.parentCategory c " +
            "WHERE c.parentCategory IS NULL " +
            "AND c.name = :categoryName " +
            "AND (:subCategory IS NULL OR sub.name = :subCategory) " +
            "OR c.name = sub.name OR c.name = detail.name " +
            "GROUP BY b.bookId"
    )
    Page<BookSearchResponseDto> findByCategory(@Param("categoryName") String categoryName, @Param("subCategory") String subCategory, Pageable pageable);

    @Query(value = "SELECT c.name, COUNT(b.book_id) AS count " +
            "FROM book AS b " +
            "LEFT JOIN category AS detail ON detail.category_id = b.category_id " +
            "LEFT JOIN category AS sub ON sub.category_id = detail.parent_category_id " +
            "LEFT JOIN category AS c ON c.category_id = sub.parent_category_id " +
            "OR c.name = sub.name " +
            "OR c.name = detail.name " +
            "WHERE c.parent_category_id is null " +
            "GROUP BY c.name", nativeQuery = true)
    List<BookCountPerCategoryResponseDto> countByCategory();

    @Query(value = "SELECT sub.name, count(b.book_id) AS count " +
            "FROM book AS b " +
            "LEFT JOIN category AS detail ON detail.category_id = b.category_id " +
            "LEFT JOIN category AS sub ON sub.category_id = detail.parent_category_id " +
            "LEFT JOIN category AS c ON c.category_id = sub.parent_category_id " +
            "OR c.name = sub.name " +
            "OR c.name = detail.name " +
            "WHERE c.name = :categoryName " +
            "GROUP BY sub.name", nativeQuery = true)
    List<BookCountPerCategoryResponseDto> countBySubCategory(@Param("categoryName") String categoryName);

    @Query(value = "SELECT new com.example.bookAPI.dto.book.detail.BookDetailResponseDto(" +
            "b.bookId, " +
            "b.title, " +
            "b.writer, " +
            "b.img, " +
            "b.publisher, " +
            "b.subtitle, " +
            "CONCAT(main.name, ' > ', sub.name, ' > ', detail.name), " +
            "COUNT(bs.sharerId.memberId), " +
            "COUNT(bs.requesterId.memberId), " +
            "coalesce(avg(br.rating),0), " +
            "COUNT(br.reviewId), " +
            "b.publishDate, " +
            "b.count, " +
            "b.detailNum, " +
            "b.introduce, " +
            "b.isEbook, " +
            "CASE WHEN MIN(bs.sharerId.memberId) = :memberId THEN TRUE ELSE FALSE END, " +
            "CASE WHEN MIN(bs.requesterId.memberId) = :memberId THEN TRUE ELSE FALSE END ) " +
            "FROM Book b " +
            "JOIN b.category detail " +
            "LEFT JOIN b.reviews br " +
            "LEFT JOIN detail.parentCategory sub " +
            "LEFT JOIN sub.parentCategory main " +
            "LEFT JOIN b.bookShares bs " +
            "WHERE b.bookId = :bookId " +
            "GROUP BY b.bookId "
    )
    BookDetailResponseDto findByIdAndMemberId(@Param("bookId") Long bookId, @Param("memberId") Long memberId);
}
