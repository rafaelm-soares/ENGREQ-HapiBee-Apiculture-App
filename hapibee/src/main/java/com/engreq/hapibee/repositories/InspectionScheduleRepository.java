package com.engreq.hapibee.repositories;

import com.engreq.hapibee.entity.InspectionScheduleEntity;
import com.engreq.hapibee.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InspectionScheduleRepository extends JpaRepository<InspectionScheduleEntity, Long> {

    @Query("SELECT l FROM InspectionScheduleEntity l WHERE l.user = :user AND l.date > CURRENT_DATE")
    List<InspectionScheduleEntity> findAllByUser(UserEntity user);

}
