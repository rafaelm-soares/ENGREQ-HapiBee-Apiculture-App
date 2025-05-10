package com.engreq.hapibee.repositories;

import com.engreq.hapibee.entity.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {

    @Query(value = "SELECT s FROM UserEntity s WHERE s.isDeleted = false")
    Page<UserEntity> findAllUsers(Pageable pageable);

    Optional<UserEntity> findByEmail(String email);

    Boolean existsByEmail(String email);

}