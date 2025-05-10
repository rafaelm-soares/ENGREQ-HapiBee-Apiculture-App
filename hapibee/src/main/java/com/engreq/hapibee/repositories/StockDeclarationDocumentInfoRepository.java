package com.engreq.hapibee.repositories;

import com.engreq.hapibee.entity.StockDeclarationDocumentInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StockDeclarationDocumentInfoRepository extends JpaRepository<StockDeclarationDocumentInfoEntity, Long> {
    List<StockDeclarationDocumentInfoEntity> getStockDelcarationDocumentByOfficialBeekeeperId(String officialId);

    Optional<StockDeclarationDocumentInfoEntity> findStockDeclarationDocumentInfoEntitiesByDocumentNumber(Long id);
}
