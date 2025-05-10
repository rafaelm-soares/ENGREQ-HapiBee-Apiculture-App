package com.engreq.hapibee.repositories;

import com.engreq.hapibee.entity.BeeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BeeRepository extends JpaRepository<BeeEntity, Long> {
}
