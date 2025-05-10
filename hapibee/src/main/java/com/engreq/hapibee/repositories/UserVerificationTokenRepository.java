package com.engreq.hapibee.repositories;

import com.engreq.hapibee.entity.UserEntity;
import com.engreq.hapibee.entity.UserVerificationTokenEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserVerificationTokenRepository extends JpaRepository<UserVerificationTokenEntity, Long> {

    @Query("SELECT s FROM UserVerificationTokenEntity s WHERE s.user = :user")
    Optional<UserVerificationTokenEntity> findByUser(UserEntity user);

    @Query("SELECT s FROM UserVerificationTokenEntity s WHERE s.token = :token")
    Optional<UserVerificationTokenEntity> findByToken(@Param("token") String token);

}
