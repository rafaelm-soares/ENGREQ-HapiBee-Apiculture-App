package com.engreq.hapibee.repositories;

import com.engreq.hapibee.entity.HiveSplitEntity;
import com.engreq.hapibee.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HiveSplitRepository extends JpaRepository<HiveSplitEntity, Long> {

    List<HiveSplitEntity> getHiveSplitByUser(UserEntity user);

}
