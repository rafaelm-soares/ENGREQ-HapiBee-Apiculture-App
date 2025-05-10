package com.engreq.hapibee.mappers;


import com.engreq.hapibee.dto.LocationDTO;
import com.engreq.hapibee.dto.StockDeclarationApiaryInfoDTO;
import com.engreq.hapibee.entity.StockDeclarationApiaryInfoEntity;

public class StockDeclarationApiaryMapper {


    public static StockDeclarationApiaryInfoDTO convertToDTO(StockDeclarationApiaryInfoEntity entity) {
        StockDeclarationApiaryInfoDTO dto = new StockDeclarationApiaryInfoDTO();
        dto.apiaryId=entity.getApiaryId();
        dto.placeName= entity.getPlaceName();
        dto.apiaryLocation = new LocationDTO();
        dto.apiaryLocation.municipality = entity.getApiaryLocation().getMunicipality();
        dto.apiaryLocation.parish = entity.getApiaryLocation().getParish();
        dto.apiaryLocation.place = entity.getApiaryLocation().getPlace();
        dto.apiaryLocation.latitude = entity.getApiaryLocation().getLatitude();
        dto.apiaryLocation.longitude = entity.getApiaryLocation().getLongitude();
        dto.documentNumber= entity.getDocumentNumber();
        //dto.colonyNumber= entity.getColonyNumber();
        dto.controledZone= entity.isControledZone();
        dto.culturaIntensiva= entity.isIntensiveCulture();
        dto.hiveNumber= entity.getHiveNumber();
        dto.hiveSuperNumber= entity.getHiveSuperNumber();
        dto.transfer= entity.isTransfer();
        return dto;
    }
}
