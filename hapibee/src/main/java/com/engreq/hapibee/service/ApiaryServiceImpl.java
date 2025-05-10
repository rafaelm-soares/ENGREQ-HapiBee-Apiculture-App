package com.engreq.hapibee.service;

import com.engreq.hapibee.dto.*;
import com.engreq.hapibee.entity.*;
import com.engreq.hapibee.enums.*;
import com.engreq.hapibee.mappers.ApiaryMapper;
import com.engreq.hapibee.mappers.HiveMapper;
import com.engreq.hapibee.repositories.ApiaryRepository;
import com.engreq.hapibee.repositories.HiveRepository;
import com.engreq.hapibee.repositories.HiveSuperRepository;
import com.engreq.hapibee.repositories.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ApiaryServiceImpl implements ApiaryService {

    @Autowired
    ApiaryRepository apiaryRepository;
    @Autowired
    LocationRepository locationRepository;
    @Autowired
    HiveRepository hiveRepository;
    @Autowired
    HiveSuperRepository hiveSuperRepository;
    @Autowired
    SendEmailService emailService;

    @Override
    public List<ApiaryDTO> getApiaryList(UserDetails userDetails) {
        List<ApiaryDTO> result = new ArrayList<>();
        // Cast user
        UserEntity user = (UserEntity) userDetails;
        // Find apiaries
        List<ApiaryEntity> list = apiaryRepository.getApiaryByUser(user);
        for (ApiaryEntity entity : list) {
            ApiaryDTO dto = ApiaryMapper.convertToDTO(entity);
            result.add(dto);
        }
        return result;
    }

    @Override
    public ApiaryDTO createApiary(NewApiaryDTO dto, UserDetails userDetails) {
        // Cast user
        UserEntity user = (UserEntity) userDetails;
        // Location
        LocationEntity savedLocation = this.verifyAndGetLocation(dto.location);
        // Create apiary
        EProductionGoal productionGoal = EProductionGoal.valueOf(dto.productionGoal);
        EProductionType productionType = EProductionType.valueOf(dto.productionType);
        EApiaryApprovalStatus approvalStatus = EApiaryApprovalStatus.PENDING;
        ApiaryEntity newApiary = ApiaryEntity.builder()
                .name(dto.name)
                .numberOfHives(dto.numberOfHives)
                .productionGoal(productionGoal)
                .productionType(productionType)
                .location(savedLocation)
                .vegetation(dto.vegetation)
                .observations(dto.observations)
                .isApproved(approvalStatus)
                .user(user)
                .build();
        ApiaryEntity savedApiary = apiaryRepository.save(newApiary);
        return ApiaryMapper.convertToDTO(savedApiary);
    }

    @Override
    public Boolean approveApiary(Long id, Boolean approvalStatus) {
        Optional<ApiaryEntity> lookup = apiaryRepository.findById(id);
        if (lookup.isPresent()) {
            ApiaryEntity found = lookup.get();
            if (approvalStatus) {
                EApiaryApprovalStatus status = EApiaryApprovalStatus.APPROVED;
                found.setIsApproved(status);
                // Create hives after apiary is approved
                this.createHive(found);
            } else {
                EApiaryApprovalStatus status = EApiaryApprovalStatus.DENIED;
                found.setIsApproved(status);
            }
            ApiaryEntity updated = apiaryRepository.save(found);
            String userEmail = found.getUser().getEmail();
            String userFirstName = found.getUser().getFirstName();
            String userLastName = found.getUser().getLastName();
            String status = approvalStatus ? "APROVADO" : "RECUSADO";
            String message = "Olá " + userFirstName + " " + userLastName + ",\n\nO apiário com o id " + found.getId() + " foi " + status + ".";
            emailService.enviarEmail(userEmail, "Aprovação de Apiário", message);
            return true;
        }
        return false;
    }

    private void createHive(ApiaryEntity apiary) {
        int numberOfHives = apiary.getNumberOfHives();
        List<HiveEntity> list = new ArrayList<>();
        for (int i = 0; i < numberOfHives; i++) {
            String safeName = apiary.getName() + "_" + (i + 1);
            HiveEntity newHive = HiveEntity.builder()
                    .apiary(apiary)
                    .name(safeName)
                    .build();
            list.add(newHive);
        }
        hiveRepository.saveAll(list);
    }

    @Override
    public ApiaryDTO updateApiary(ApiaryDTO dto) {
        Optional<ApiaryEntity> lookup = apiaryRepository.findById(dto.id);
        if (lookup.isPresent()) {
            ApiaryEntity found = lookup.get();
            if (dto.name != null) {
                found.setName(dto.name);
            }
            if (dto.productionGoal != null) {
                EProductionGoal productionGoal = EProductionGoal.valueOf(dto.productionGoal);
                found.setProductionGoal(productionGoal);
            }
            if (dto.productionType != null) {
                EProductionType productionType = EProductionType.valueOf(dto.productionType);
                found.setProductionType(productionType);
            }
            if (dto.location != null) {
                LocationEntity savedLocation = this.verifyAndGetLocation(dto.location);
                found.setLocation(savedLocation);
            }
            if (dto.vegetation != null) {
                found.setVegetation(dto.vegetation);
            }
            if (dto.observations != null) {
                found.setObservations(dto.observations);
            }
            ApiaryEntity updated = apiaryRepository.save(found);
            return ApiaryMapper.convertToDTO(updated);
        }
        return null;
    }

    private LocationEntity verifyAndGetLocation(LocationDTO dto) {
        Double latitude = dto.latitude;
        Double longitude = dto.longitude;
        Optional<LocationEntity> lookup = locationRepository.findByLatitudeAndLongitude(latitude, longitude);
        if (lookup.isPresent()) {
            return lookup.get();
        }
        LocationEntity savedLocation = this.createLocation(dto);
        return savedLocation;
    }

    private LocationEntity createLocation(LocationDTO dto) {
        LocationEntity newLocation = LocationEntity.builder()
                .municipality(dto.municipality)
                .parish(dto.parish)
                .place(dto.place)
                .latitude(dto.latitude)
                .longitude(dto.longitude)
                .build();
        LocationEntity savedLocation = locationRepository.save(newLocation);
        return savedLocation;
    }

    @Override
    public Boolean deleteApiary(Long id) {
        Optional<ApiaryEntity> lookup = apiaryRepository.findById(id);
        if (lookup.isPresent()) {
            apiaryRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public List<HiveDTO> getHiveList(UserDetails userDetails) {
        List<HiveDTO> result = new ArrayList<>();
        // Cast user
        UserEntity user = (UserEntity) userDetails;
        // Find user apiaries
        List<ApiaryEntity> listA = apiaryRepository.getApiaryByUser(user);
        for (ApiaryEntity entityA : listA) {
            // Find hives
            List<HiveEntity> listH = hiveRepository.getHiveByApiary(entityA);
            for (HiveEntity entityH : listH) {
                HiveDTO dto = HiveMapper.convertToDTO(entityH);
                result.add(dto);
            }
        }
        return result;
    }

    public HiveDTO createHive(NewHiveDTO dto, UserDetails userDetails) {

        ApiaryEntity apiary = apiaryRepository.getReferenceById(dto.apiaryID);
        int numberOfHives = apiary.getNumberOfHives();

        apiary.setNumberOfHives(numberOfHives + 1);
        this.updateApiary(ApiaryMapper.convertToDTO(apiary));

        HiveEntity newHive = HiveEntity.builder()
                .apiary(apiary)
                .name(dto.name).build();
        HiveEntity savedHive = hiveRepository.save(newHive);

        return HiveMapper.convertToDTO(savedHive);
    }

    public HiveDTO updateHive(HiveDTO dto, UserDetails userDetails) {
        Optional<HiveEntity> hive = hiveRepository.findById(dto.id);
        if (hive.isEmpty()) {
            throw new IllegalArgumentException("Hive not found");
        }
        // Create new hive super
        List<HiveSuperEntity> superList = new ArrayList<>();
        for (HiveSuperDTO superDto : dto.hiveSuper) {
            EHiveSuperType type = EHiveSuperType.valueOf(superDto.type);
            HiveSuperEntity newSuper = HiveSuperEntity.builder()
                    .id(superDto.id)
                    .numberOfBoards(superDto.numberOfBoards)
                    .type(type)
                    .build();
            superList.add(newSuper);
        }
        List<HiveSuperEntity> savedSuper = hiveSuperRepository.saveAll(superList);
        // Update hive
        HiveEntity safeHive = hive.get();
        if (dto.name != null && !dto.name.isEmpty()) {
            safeHive.setName(dto.name);
        }
        if (!dto.hiveSuper.isEmpty()) {
            safeHive.setHiveSuperList(superList);
        }
        HiveEntity savedHive = hiveRepository.save(safeHive);
        return HiveMapper.convertToDTO(savedHive);
    }

}
