package com.engreq.hapibee.mappers;


import com.engreq.hapibee.dto.StockDeclarationApiaryInfoDTO;
import com.engreq.hapibee.dto.StockDeclarationTotalApiaryInfoDTO;

import java.util.List;

public class StockDeclarationTotalApiaryInfoMapper {


    public static StockDeclarationTotalApiaryInfoDTO convertToDTO(List<StockDeclarationApiaryInfoDTO> listApiaryInfo, int totalHiveNumber, int totalHiveSuperNumber) {
        StockDeclarationTotalApiaryInfoDTO dto = new StockDeclarationTotalApiaryInfoDTO();
        dto.listApiarysWithInfo=listApiaryInfo;
        dto.totalApiaryNumber=listApiaryInfo.size();
        dto.totalHiveNumber=totalHiveNumber;
        dto.totalHiveSuperNumber=totalHiveSuperNumber;
        return dto;
    }
}
