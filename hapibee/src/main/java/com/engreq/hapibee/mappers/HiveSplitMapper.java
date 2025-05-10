package com.engreq.hapibee.mappers;

import com.engreq.hapibee.dto.HiveSplitDTO;
import com.engreq.hapibee.entity.HiveEntity;
import com.engreq.hapibee.entity.HiveSplitEntity;

import java.util.ArrayList;
import java.util.List;

public class HiveSplitMapper {

    public static HiveSplitDTO convertToDTO(HiveSplitEntity entity) {
        HiveSplitDTO dto = new HiveSplitDTO();
        dto.id = entity.getId();
        dto.apiary = entity.getApiary().getId();
        dto.hiveOrigID = entity.getHiveOrig().getId();
        dto.listOfHiveDestID = listToDTO(entity.getHiveDestList());
        dto.reproductionQueen = entity.getReproductionQueen().toString();
        dto.reproductionManagement = entity.getReproductionManagement().toString();
        dto.hiveSplitDate = entity.getHiveSplitDate();
        dto.productionType = entity.getProductionType().toString();
        dto.quantitiy = entity.getQuantitiy();
        dto.quantityType = entity.getQuantityType().toString();

        return dto;
    }

    private static List<Long> listToDTO(List<HiveEntity> hiveList){
        List<Long> dtoList = new ArrayList<>();

        for (HiveEntity hive : hiveList){
            dtoList.add(hive.getId());
        }

        return dtoList;
    }

}
