package com.example.bookAPI.repository;

import com.example.bookAPI.domain.Post;
import com.example.bookAPI.dto.post.PostBookInterface;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PostRepository extends JpaRepository<Post, Long> {

    @Query(value = "SELECT p.title, m.name, p.content, " +
            "p.create_date_time AS createDateTime, GROUP_CONCAT(pt.name SEPARATOR ',') AS tags, " +
            "MIN(ps.post_status) AS status " +
            "FROM post p " +
            "JOIN member m ON m.member_id = p.member_id " +
            "JOIN post_category pc ON pc.post_id = p.post_id " +
            "LEFT JOIN post_tag pt ON pt.post_id = p.post_id " +
            "LEFT JOIN post_status ps ON ps.post_id = p.post_id " +
            "WHERE p.book_id = :bookId AND pc.post_type = :postType " +
            "GROUP BY p.post_id",
            nativeQuery = true
    )
    Page<PostBookInterface> findPostByPostTypeAndBookId(@Param("bookId") Long bookId, @Param("postType") String postType, PageRequest pageable);



    @Query(value = "SELECT p.create_date_time " +
            "FROM post p " +
            "WHERE p.book_id = :bookId ",
            nativeQuery = true
    )
    Page<Object> findPostByPostTypeAndBookId(@Param("bookId") Long bookId, PageRequest pageable);
}
