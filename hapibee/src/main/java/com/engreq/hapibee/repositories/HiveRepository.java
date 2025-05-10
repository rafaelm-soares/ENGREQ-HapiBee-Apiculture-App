package com.engreq.hapibee.repositories;

import com.engreq.hapibee.entity.ApiaryEntity;
import com.engreq.hapibee.entity.HiveEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HiveRepository extends JpaRepository<HiveEntity, Long> {

    List<HiveEntity> getHiveByApiary(ApiaryEntity user);

    @Query("SELECT h FROM HiveEntity h WHERE h.id IN :ids")
    List<HiveEntity> findAllById(List<Long> ids);

    List<HiveEntity> findAllByApiary(ApiaryEntity apiary);
}
