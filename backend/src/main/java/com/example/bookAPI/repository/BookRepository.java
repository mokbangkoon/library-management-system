package com.example.bookAPI.repository;

import com.example.bookAPI.domain.Book;
import com.example.bookAPI.dto.book.best.BookBestResponseDto;
import com.example.bookAPI.dto.book.BookCountPerCategoryResponseDto;
import com.example.bookAPI.dto.book.category.BookTeamCategoryResponseDto;
import com.example.bookAPI.dto.book.purchase.BookPurchaseResponseDto;
import com.example.bookAPI.dto.book.review.BookReviewResponseDto;
import com.example.bookAPI.dto.book.search.BookSearchResponseDto;
import com.example.bookAPI.dto.book.shareAndFind.BookShareAndFindResponseDto;
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

    @Query(value = "SELECT new com.example.bookAPI.dto.book.search.BookSearchResponseDto(b.bookId, b.title, b.writer, b.publisher, b.img) " +
            "FROM Book b " +
            "WHERE (:searchFilter = 1 AND b.title LIKE %:title%) OR " +
            "(:searchFilter = 2 AND b.writer LIKE %:title%) OR " +
            "(:searchFilter = 3 AND b.publisher LIKE %:title%) OR " +
            "(:searchFilter = 4 AND b.introduce LIKE %:title%) OR " +
            "(b.title LIKE %:title% OR b.writer LIKE %:title% OR b.publisher LIKE %:title% OR b.introduce LIKE %:title%)"
    )
    Page<BookSearchResponseDto> findBookBySearch(@Param("searchFilter") int searchFilter, @Param("title") String title, Pageable pageable);

    @Query(value = "SELECT new com.example.bookAPI.dto.book.purchase.BookPurchaseResponseDto(b.bookId AS id, b.title, b.writer, b.img, " +
            "CONCAT(main.name, ' > ', sub.name, ' > ', detail.name) AS categories) " +
            "FROM Book b " +
            "JOIN b.category detail " +
            "LEFT OUTER JOIN detail.parentCategory sub " +
            "LEFT OUTER JOIN sub.parentCategory main "
    )
    Page<BookPurchaseResponseDto> findBookByPurchasedOrder(Pageable pageable);

    @Query(value = "SELECT new com.example.bookAPI.dto.book.best.BookBestResponseDto(b.bookId AS id, b.title, b.writer, b.publisher, b.img) " +
            "FROM Book b " +
            "JOIN b.reviews r " +
            "JOIN b.views v " +
            "GROUP BY b.bookId " +
            "ORDER BY (count(distinct v.viewId) * 4 + avg (r.rating) * 6) DESC"
    )
    Page<BookBestResponseDto> findBookByBestOrder(PageRequest pageable);


    @Query(value = "SELECT new com.example.bookAPI.dto.book.shareAndFind.BookShareAndFindResponseDto(b.bookId AS id, b.title, b.writer, b.publisher, b.img) " +
            "FROM Book b " +
            "JOIN b.bookShares bs " +
            "WHERE bs.bookStatus = 1"
    )
    Page<BookShareAndFindResponseDto> findBookByShared(PageRequest pageable);

    @Query(value = "SELECT new com.example.bookAPI.dto.book.shareAndFind.BookShareAndFindResponseDto(b.bookId AS id, b.title, b.writer, b.publisher, b.img) " +
            "FROM Book b " +
            "JOIN b.bookShares bs " +
            "WHERE bs.bookStatus = 3"
    )
    Page<BookShareAndFindResponseDto> findBookByFound(PageRequest pageable);

    @Query(value = "SELECT new com.example.bookAPI.dto.book.review.BookReviewResponseDto(b.bookId AS id, b.title, b.writer, b.publisher, b.img, " +
            "MIN(r.content) AS content, " +
            "MIN(r.member.name) AS name," +
            "MIN(r.rating) AS rating," +
            "MIN(r.createDateTime) AS createDateTime) " +
            "FROM Book b " +
            "JOIN b.reviews r " +
            "GROUP BY b.bookId " +
            "ORDER BY MIN(r.createDateTime) desc"
    )
    Page<BookReviewResponseDto> findBookByReviews(PageRequest pageable);

    @Query(value = "SELECT new com.example.bookAPI.dto.book.category.BookTeamCategoryResponseDto(b.bookId AS id, b.title, b.writer, b.publisher, b.img) " +
            "FROM Book b " +
            "JOIN b.memberBooks mb " +
            "JOIN mb.member m " +
            "WHERE m.team.teamId = :teamId " +
            "GROUP BY b.bookId "
    )
    Page<BookTeamCategoryResponseDto> findBookByTeamCategory(@Param("teamId") Long teamId, PageRequest pageable);

    @Query(value = "SELECT new com.example.bookAPI.dto.book.search.BookSearchResponseDto(b.bookId, b.title, b.writer, b.publisher, b.img) " +
            "FROM Book b " +
            "LEFT JOIN b.reviews br " +
            "LEFT JOIN b.category detail "+
            "LEFT JOIN detail.parentCategory sub "+
            "LEFT JOIN sub.parentCategory c " +
            "WHERE c.parentCategory IS NULL " +
            "AND c.name = :categoryName " +
            "AND (:title IS NULL OR b.title LIKE %:title% OR b.subtitle LIKE %:title%) " +
            "AND (:subCategory IS NULL OR sub.name = :subCategory) " +
            "OR c.name = sub.name OR c.name = detail.name " +
            "GROUP BY b.bookId"
    )
    Page<BookSearchResponseDto> findByCategory(@Param("categoryName") String categoryName, @Param("title") String title, @Param("subCategory") String subCategory, Pageable pageable);

    @Query(value = "SELECT c.name, COUNT(b.book_id) AS count " +
            "FROM book AS b " +
            "LEFT JOIN category AS detail ON detail.category_id = b.category_id " +
            "LEFT JOIN category AS sub ON sub.category_id = detail.parent_category_id " +
            "LEFT JOIN category AS c ON c.category_id = sub.parent_category_id " +
            "OR c.name = sub.name " +
            "OR c.name =detail.name " +
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
}
