package com.engreq.hapibee.repositories;

import com.engreq.hapibee.entity.HiveSuperEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HiveSuperRepository extends JpaRepository<HiveSuperEntity, Long> {
}
