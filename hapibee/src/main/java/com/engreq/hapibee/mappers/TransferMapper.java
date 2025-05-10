package com.engreq.hapibee.mappers;

import com.engreq.hapibee.dto.LocationDTO;
import com.engreq.hapibee.dto.TransferDTO;
import com.engreq.hapibee.entity.TransferEntity;

public class TransferMapper {

    public static TransferDTO convertToDTO(TransferEntity entity) {
        TransferDTO dto = new TransferDTO();
        dto.id = entity.getId();
        dto.apiaryID = entity.getApiary().getId();
        dto.transferDate = entity.getTransferDate();
        dto.location = new LocationDTO();
        dto.location.municipality = entity.getLocation().getMunicipality();
        dto.location.parish = entity.getLocation().getParish();
        dto.location.place = entity.getLocation().getPlace();
        dto.location.latitude = entity.getLocation().getLatitude();
        dto.location.longitude = entity.getLocation().getLongitude();
        dto.isControledZoneApproved = entity.getControledZonesStatus().toString();
        dto.isDgavApproved = entity.getDgavStatus().toString();
        dto.isTransferApproved = entity.getTransferStatus().toString();
        return dto;
    }
}
