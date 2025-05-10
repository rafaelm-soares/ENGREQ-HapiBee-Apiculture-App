package com.engreq.hapibee.mappers;

import com.engreq.hapibee.dto.StockDeclarationDocumentInfoDTO;
import com.engreq.hapibee.entity.StockDeclarationDocumentInfoEntity;

public class StockDeclarationDocumentMapper {

    public static StockDeclarationDocumentInfoDTO convertToDTO(StockDeclarationDocumentInfoEntity entity) {
        StockDeclarationDocumentInfoDTO dto = new StockDeclarationDocumentInfoDTO();
        dto.documentNumber = entity.getDocumentNumber();
        dto.officialBeekeeperId = entity.getOfficialBeekeeperId();
        dto.version=entity.getVersion();
        dto.declarationType=entity.getDeclarationType().toString();
        dto.unidadeOrganica= entity.getUnidadeOrganica();
        dto.year= entity.getYear();
        dto.submissionDate = entity.getSubmissionDate();
        return dto;
    }
}
