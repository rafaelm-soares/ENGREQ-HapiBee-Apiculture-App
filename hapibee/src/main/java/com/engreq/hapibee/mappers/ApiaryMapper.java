package com.engreq.hapibee.mappers;

import com.engreq.hapibee.dto.ApiaryDTO;
import com.engreq.hapibee.dto.LocationDTO;
import com.engreq.hapibee.entity.ApiaryEntity;

public class ApiaryMapper {

    public static ApiaryDTO convertToDTO(ApiaryEntity entity) {
        ApiaryDTO dto = new ApiaryDTO();
        dto.id = entity.getId();
        dto.name = entity.getName();
        dto.numberOfHives = entity.getNumberOfHives();
        dto.productionGoal = entity.getProductionGoal().toString();
        dto.productionType = entity.getProductionType().toString();
        dto.location = new LocationDTO();
        dto.location.municipality = entity.getLocation().getMunicipality();
        dto.location.parish = entity.getLocation().getParish();
        dto.location.place = entity.getLocation().getPlace();
        dto.location.latitude = entity.getLocation().getLatitude();
        dto.location.longitude = entity.getLocation().getLongitude();
        dto.vegetation = entity.getVegetation();
        dto.observations = entity.getObservations();
        dto.isApproved = entity.getIsApproved().toString();
        return dto;
    }
}
