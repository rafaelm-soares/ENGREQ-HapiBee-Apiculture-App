package com.engreq.hapibee.repositories;

import com.engreq.hapibee.entity.StockDeclarationApiaryInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StockDeclarationApiaryInfoRepository extends JpaRepository<StockDeclarationApiaryInfoEntity, Long> {
     List<StockDeclarationApiaryInfoEntity> getStockDelcarationApiaryByDocumentNumber(Long documentNumber);

}
