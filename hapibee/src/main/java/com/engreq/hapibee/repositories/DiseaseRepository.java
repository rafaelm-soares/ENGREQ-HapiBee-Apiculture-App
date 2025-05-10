package com.engreq.hapibee.repositories;

import com.engreq.hapibee.entity.DiseaseEntity;
import com.engreq.hapibee.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiseaseRepository extends JpaRepository<DiseaseEntity, Long> {

    List<DiseaseEntity> getDiseaseByUser(UserEntity user);

    @Query("SELECT d FROM DiseaseEntity d WHERE d.id IN :ids")
    List<DiseaseEntity> findAllById(List<Long> ids);

}
