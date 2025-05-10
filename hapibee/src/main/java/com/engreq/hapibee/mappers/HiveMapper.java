package com.engreq.hapibee.mappers;

import com.engreq.hapibee.dto.HiveDTO;
import com.engreq.hapibee.dto.HiveSuperDTO;
import com.engreq.hapibee.entity.HiveEntity;
import com.engreq.hapibee.entity.HiveSuperEntity;

import java.util.ArrayList;
import java.util.List;

public class HiveMapper {

    public static HiveDTO convertToDTO(HiveEntity entity) {
        List<HiveSuperDTO> superList = new ArrayList<>();
        for (HiveSuperEntity entity1 : entity.getHiveSuperList()) {
            HiveSuperDTO dto1 = new HiveSuperDTO();
            dto1.id = entity1.getId();
            dto1.type = entity1.getType().toString();
            dto1.numberOfBoards = entity1.getNumberOfBoards();
            superList.add(dto1);
        }
        HiveDTO dto = new HiveDTO();
        dto.id = entity.getId();
        dto.name = entity.getName();
        dto.apiaryID = entity.getApiary().getId();
        dto.apiaryName = entity.getApiary().getName();
        dto.hiveSuper = superList;
        return dto;
    }

}
