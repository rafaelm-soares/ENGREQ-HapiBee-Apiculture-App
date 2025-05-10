package com.engreq.hapibee.mappers;

import com.engreq.hapibee.dto.FeedingDTO;
import com.engreq.hapibee.entity.FeedingEntity;

public class FeedingMapper {

    public static FeedingDTO convertToDTO(FeedingEntity entity) {
        FeedingDTO dto = new FeedingDTO();
        dto.id = entity.getId();
        dto.apiaryID = entity.getHive().getApiary().getId();
        dto.hiveID = entity.getHive().getId();
        dto.date = entity.getDate();
        dto.product = entity.getProduct();
        dto.formula = entity.getFormula();
        dto.origin = entity.getOrigin().toString();
        dto.dose = entity.getDose();
        return dto;
    }

}
