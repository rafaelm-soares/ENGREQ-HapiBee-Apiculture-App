package com.engreq.hapibee.mappers;

import com.engreq.hapibee.dto.CrestaDTO;
import com.engreq.hapibee.entity.CrestaEntity;

public class CrestaMapper{

    public static CrestaDTO convertToDTO(CrestaEntity entity) {

        CrestaDTO dto = new CrestaDTO();
        dto.id = entity.getId();
        dto.apiaryID = entity.getHive().getApiary().getId();
        dto.hiveID = entity.getHive().getId();
        dto.nrOfBoards=entity.getNrOfBoards();
        dto.quantityType = entity.getQuantityType().toString();
        dto.quantity = entity.getQuantity();
        dto.ProductType = entity.getProductType().toString();
        dto.CrestaDate = entity.getCrestaDate();

        return dto;
    }
}
