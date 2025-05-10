package com.engreq.hapibee.mappers;

import com.engreq.hapibee.dto.MaintenanceDTO;
import com.engreq.hapibee.entity.MaintenanceEntity;

public class MaintenanceMapper {

    public static MaintenanceDTO convertToDTO(MaintenanceEntity entity) {
        MaintenanceDTO dto = new MaintenanceDTO();
        dto.id = entity.getId();
        dto.apiaryID = entity.getHive().getApiary().getId();
        dto.hiveID = entity.getHive().getId();
        dto.date = entity.getDate();
        dto.humidity = entity.getHumidity();
        dto.inspectionType = entity.getInspectionType().toString();
        dto.temperature = entity.getTemperature();
        dto.motive = entity.getMotive().toString();
        dto.disinfectionMode = entity.getDisinfectionMode().toString();
        dto.productsUsed = entity.getProductsUsed();
        dto.observations = entity.getObservations();
        return dto;
    }

}
