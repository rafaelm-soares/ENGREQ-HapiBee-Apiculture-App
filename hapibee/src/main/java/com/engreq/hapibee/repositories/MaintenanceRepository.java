package com.engreq.hapibee.repositories;

import com.engreq.hapibee.entity.MaintenanceEntity;
import com.engreq.hapibee.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MaintenanceRepository extends JpaRepository<MaintenanceEntity, Long> {

    List<MaintenanceEntity> getInspectionByUser(UserEntity user);

    @Query("SELECT m FROM MaintenanceEntity m WHERE m.id IN :ids")
    List<MaintenanceEntity> findAllById(List<Long> ids);

}
