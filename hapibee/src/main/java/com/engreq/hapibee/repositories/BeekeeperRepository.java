package com.engreq.hapibee.repositories;

import com.engreq.hapibee.entity.BeekeeperEntity;
import com.engreq.hapibee.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BeekeeperRepository extends JpaRepository<BeekeeperEntity, Long> {
    BeekeeperEntity getBeekeeperByUser(UserEntity user);
}
