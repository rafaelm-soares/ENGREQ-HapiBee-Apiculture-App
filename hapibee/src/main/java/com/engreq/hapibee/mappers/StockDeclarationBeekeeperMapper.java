package com.engreq.hapibee.mappers;


import com.engreq.hapibee.dto.StockDeclarationBeekeeperInfoDTO;
import com.engreq.hapibee.entity.BeekeeperEntity;


public class StockDeclarationBeekeeperMapper {

    public static StockDeclarationBeekeeperInfoDTO convertToDTO(BeekeeperEntity entity) {
        StockDeclarationBeekeeperInfoDTO dto = new StockDeclarationBeekeeperInfoDTO();
            dto.beekeeperOfficialID = entity.getOfficialId();
            dto.beekeeperAddress = entity.getAddress();
            dto.beekeeperNif = entity.getNif();
            dto.beekeeperPhoneNumber = entity.getPhoneNumber();
        return dto;
    }
}
