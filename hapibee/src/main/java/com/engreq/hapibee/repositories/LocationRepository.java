package com.engreq.hapibee.repositories;

import com.engreq.hapibee.entity.LocationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LocationRepository extends JpaRepository<LocationEntity, Long> {

    Optional<LocationEntity> findByLatitudeAndLongitude(Double latitude, Double longitude);

}
