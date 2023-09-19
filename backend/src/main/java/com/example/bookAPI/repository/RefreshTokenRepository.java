package com.example.bookAPI.repository;

import com.example.bookAPI.domain.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByValue(String value);


    @Query("select r from RefreshToken r where  r.member.memberId = :memberId")
    Optional<RefreshToken> findByMemberId(@Param("memberId") Long memberId);
}
