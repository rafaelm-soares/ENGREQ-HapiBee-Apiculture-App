package com.engreq.hapibee.service;


import com.engreq.hapibee.dto.*;
import com.engreq.hapibee.entity.*;
import com.engreq.hapibee.enums.*;
import com.engreq.hapibee.mappers.ApiaryMapper;
import com.engreq.hapibee.mappers.CrestaMapper;
import com.engreq.hapibee.mappers.TransferMapper;
import com.engreq.hapibee.repositories.ApiaryRepository;
import com.engreq.hapibee.repositories.CrestaRepository;
import com.engreq.hapibee.repositories.HiveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class CrestServiceImpl implements CrestService{
    @Autowired
    CrestaRepository crestaRepository;
    @Autowired
    ApiaryRepository apiaryRepository;
    @Autowired
    HiveRepository hiveRepository;



    @Override
    public List<CrestaDTO> getCrestaList(UserDetails userDetails) {
        List<CrestaDTO> result = new ArrayList<>();
        // Cast user
        UserEntity user = (UserEntity) userDetails;
        // Find apiaries
        List<CrestaEntity> list = crestaRepository.getCrestaByUser(user);
        for (CrestaEntity entity : list) {
            CrestaDTO dto = CrestaMapper.convertToDTO(entity);
            result.add(dto);
        }
        return result;
    }
    @Override
    public CrestaDTO updateCresta(CrestaDTO dto) {
        Optional<CrestaEntity> lookup = crestaRepository.findById(dto.id);
        if (lookup.isPresent()) {
            CrestaEntity found = lookup.get();
            if (dto.nrOfBoards != null) {
                found.setNrOfBoards(dto.nrOfBoards);
            }
            if (dto.ProductType != null) {
                EProductType productType = EProductType.valueOf(dto.ProductType);
                found.setProductType(productType);
            }
            if (dto.quantity != null) {
                found.setQuantity(dto.quantity);
            }
            if (dto.quantityType != null) {
                EQuantityType quantityType = EQuantityType.valueOf(dto.quantityType);
                found.setQuantityType(quantityType);
            }
           CrestaEntity updated = crestaRepository.save(found);
            return CrestaMapper.convertToDTO(updated);
        }
        return null;
    }
    @Override
    public CrestaDTO createCresta(NewCrestaDTO dto, UserDetails userDetails) {
        Optional<ApiaryEntity> lookup = apiaryRepository.findById(dto.apiaryID);
        Optional<HiveEntity> lookup2 = hiveRepository.findById(dto.hiveID);
        if (lookup.isPresent()) {
            if (lookup2.isPresent()) {
                ApiaryEntity apiary = lookup.get();
                HiveEntity hive = lookup2.get();
                // Cast user
                UserEntity user = (UserEntity) userDetails;
                // Create Cresta
                CrestaEntity newcresta = CrestaEntity.builder()
                        .apiary(apiary)
                        .hive(hive)
                        .nrOfBoards(dto.nrOfBoards)
                        .ProductType(EProductType.valueOf(dto.ProductType))
                        .quantity(dto.quantity)
                        .quantityType(EQuantityType.valueOf(dto.quantityType))
                        .CrestaDate(dto.CrestaDate)
                        .user(user)
                        .build();
                CrestaEntity savedCresta = crestaRepository.save(newcresta);
                return CrestaMapper.convertToDTO(savedCresta);
            }

        }
        return null;
    }
}
