package com.engreq.hapibee.service;

import com.engreq.hapibee.dto.*;
import com.engreq.hapibee.entity.HiveEntity;
import com.engreq.hapibee.entity.HiveSplitEntity;
import com.engreq.hapibee.entity.UserEntity;
import com.engreq.hapibee.enums.*;
import com.engreq.hapibee.mappers.HiveSplitMapper;
import com.engreq.hapibee.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class HiveSplitServiceImpl implements HiveSplitService {

    @Autowired
    ApiaryRepository apiaryRepository;
    @Autowired
    HiveRepository hiveRepository;
    @Autowired
    HiveSplitRepository hiveSplitRepository;

    @Override
    public List<HiveSplitDTO> getHiveSplitList(UserDetails userDetails) {
        List<HiveSplitDTO> result = new ArrayList<>();
        // Cast user
        UserEntity user = (UserEntity) userDetails;
        // Find hive splits
        List<HiveSplitEntity> list = hiveSplitRepository.getHiveSplitByUser(user);
        for (HiveSplitEntity entity : list) {
            HiveSplitDTO dto = HiveSplitMapper.convertToDTO(entity);
            result.add(dto);
        }
        return result;
    }

    @Override
    public HiveSplitDTO getHiveSplit(HiveSplitDTO dto) {
       HiveSplitEntity entity = hiveSplitRepository.getReferenceById(dto.id);

       return HiveSplitMapper.convertToDTO(entity);
    }

    @Override
    public HiveSplitDTO createHiveSplit(NewHiveSplitDTO dto, UserDetails userDetails) {

        List<HiveEntity> hiveDestList = fillHiveDestList(dto.listOfHiveDestID);

        HiveSplitEntity newHiveSplit = HiveSplitEntity.builder()
                .apiary(apiaryRepository.getReferenceById(dto.apiaryID))
                .hiveOrig(hiveRepository.getReferenceById(dto.hiveOrigID))
                .hiveDestList(hiveDestList)
                .hiveSplitDate(dto.hiveSplitDate)
                .reproductionQueen(EReproductionQueen.valueOf(dto.reproductionQueen))
                .reproductionManagement(EReproductionManagement.valueOf(dto.reproductionManagement))
                .productionType(EProductionType.valueOf(dto.productionType))
                .quantitiy(dto.quantitiy)
                .quantityType(EQuantityType.valueOf(dto.quantityType))
                .user((UserEntity) userDetails).build();
        HiveSplitEntity savedHiveSplit = hiveSplitRepository.save(newHiveSplit);

        return HiveSplitMapper.convertToDTO(savedHiveSplit);
    }

    @Override
    public HiveSplitDTO updateHiveSplit(HiveSplitDTO dto) {

        Optional<HiveSplitEntity> lookup = hiveSplitRepository.findById(dto.id);

        if (lookup.isPresent()) {
            HiveSplitEntity found = lookup.get();

            found.setApiary(apiaryRepository.getReferenceById(dto.apiary));
            found.setHiveOrig(hiveRepository.getReferenceById(dto.hiveOrigID));
            found.setHiveDestList(fillHiveDestList(dto.listOfHiveDestID));
            found.setHiveSplitDate(dto.hiveSplitDate);
            found.setReproductionQueen(EReproductionQueen.valueOf(dto.reproductionQueen));
            found.setReproductionManagement(EReproductionManagement.valueOf(dto.reproductionManagement));
            found.setProductionType(EProductionType.valueOf(dto.productionType));
            found.setQuantitiy(dto.quantitiy);
            found.setQuantityType(EQuantityType.valueOf(dto.quantityType));

            HiveSplitEntity updated = hiveSplitRepository.save(found);
            return HiveSplitMapper.convertToDTO(updated);
        }
        return null;
    }

    @Override
    public Boolean deleteHiveSplit(Long id) {
        Optional<HiveSplitEntity> lookup = hiveSplitRepository.findById(id);
        if (lookup.isPresent()) {
            hiveSplitRepository.deleteById(id);
            return true;
        }
        return false;
    }

    private List<HiveEntity> fillHiveDestList(List<Long> dtoList){
        List<HiveEntity> hiveDestList = new ArrayList<>();

        for (Long hiveID : dtoList){
            hiveDestList.add(hiveRepository.getReferenceById(hiveID));
        }
      return hiveDestList;
    }

}
