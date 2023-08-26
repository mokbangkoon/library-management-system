package com.example.bookAPI.repository;

import com.example.bookAPI.domain.Book;
import com.example.bookAPI.dto.book.BookCountPerCategoryResponseDto;
import com.example.bookAPI.dto.book.BookPurchaseResponseDto;
import com.example.bookAPI.dto.book.BookSearchResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BookRepository extends JpaRepository<Book,Long> {
    Optional<Book> findByTitle(String title);

    @Query(value = "SELECT new com.example.bookAPI.dto.book.BookSearchResponseDto(b.bookId, b.title, b.subtitle, b.writer, b.publisher, b.publishDate, b.img, b.isEbook, b.count," +
            "coalesce(avg(br.rating),0))" +
            "FROM Book b " +
            "LEFT JOIN b.reviews br " +
            "WHERE b.title LIKE %:title% OR b.subtitle LIKE %:title% " +
            "GROUP BY b.bookId",
            countQuery = "SELECT COUNT(DISTINCT b.bookId) " +
                    "FROM Book b " +
                    "LEFT JOIN b.reviews br " +
                    "WHERE b.title LIKE %:title% OR b.subtitle LIKE %:title%")
    Page<BookSearchResponseDto> findByTitleContaining(@Param("title") String title, Pageable pageable);

    @Query(value = "SELECT new com.example.bookAPI.dto.book.BookPurchaseResponseDto(b.bookId AS id, b.title, b.writer, b.img, " +
            "CONCAT(main.name, ' > ', sub.name, ' > ', detail.name) AS categories) " +
            "FROM Book b " +
            "JOIN b.category detail " +
            "LEFT OUTER JOIN detail.parentCategory sub " +
            "LEFT OUTER JOIN sub.parentCategory main "
    )
    Page<BookPurchaseResponseDto> findBookByPurchasedOrder(Pageable pageable);

    @Query(value = "SELECT new com.example.bookAPI.dto.book.BookSearchResponseDto(b.bookId, b.title, b.subtitle, b.writer, b.publisher, b.publishDate, b.img, b.isEbook, b.count," +
            "coalesce(avg(br.rating),0))" +
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
            "GROUP BY b.bookId",
            countQuery = "SELECT COUNT(DISTINCT b.bookId) "
                    + "FROM Book b "
                    + "LEFT JOIN b.category detail "
                    + "LEFT JOIN detail.parentCategory sub "
                    + "LEFT JOIN sub.parentCategory c "
                    + "WHERE c.parentCategory IS NULL "
                    + "AND c.name = :categoryName "
                    + "AND (:title IS NULL OR b.title LIKE %:title% OR b.subtitle LIKE %:title%)"
                    + "AND (:subCategory IS NULL OR sub.name = :subCategory) "
                    + "OR c.name = sub.name "
                    + "OR c.name = detail.name ")
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

    @Query("SELECT b FROM Book b INNER JOIN b.reviews WHERE b.bookId IN (:bookIds)")
    List<Book> findAllById(@Param("bookIds") List<Long> bookIds);
}
