package com.engreq.hapibee.repositories;

import com.engreq.hapibee.entity.ApiaryEntity;
import com.engreq.hapibee.entity.TransferEntity;
import com.engreq.hapibee.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransferRepository extends JpaRepository<TransferEntity, Long> {

    List<TransferEntity> getTransferByUser(UserEntity user);

}
