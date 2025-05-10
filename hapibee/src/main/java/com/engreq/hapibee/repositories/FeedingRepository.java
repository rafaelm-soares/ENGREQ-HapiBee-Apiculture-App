package com.engreq.hapibee.repositories;

import com.engreq.hapibee.entity.FeedingEntity;
import com.engreq.hapibee.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedingRepository extends JpaRepository<FeedingEntity, Long> {

    List<FeedingEntity> getFeedingByUser(UserEntity user);

    @Query("SELECT f FROM FeedingEntity f WHERE f.id IN :ids")
    List<FeedingEntity> findAllById(List<Long> ids);

}
