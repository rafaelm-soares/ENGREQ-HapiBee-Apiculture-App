package com.engreq.hapibee.mappers;

import com.engreq.hapibee.dto.DiseaseDTO;
import com.engreq.hapibee.entity.DiseaseEntity;

public class DiseaseMapper {

    public static DiseaseDTO convertToDTO(DiseaseEntity entity) {
        DiseaseDTO dto = new DiseaseDTO();
        dto.id = entity.getId();
        dto.apiaryID = entity.getHive().getApiary().getId();
        dto.hiveID = entity.getHive().getId();
        dto.date = entity.getDate();
        dto.type = entity.getType().toString();
        dto.disease = entity.getDisease();
        dto.medication = entity.getMedication();
        dto.activeSubstance = entity.getActiveSubstance();
        dto.dose = entity.getDose();
        dto.duration = entity.getDuration();
        dto.endDate = entity.getEndDate();
        return dto;
    }

}
