package com.engreq.hapibee.service;

import com.engreq.hapibee.dto.*;
import com.engreq.hapibee.entity.*;
import com.engreq.hapibee.enums.*;
import com.engreq.hapibee.mappers.DiseaseMapper;
import com.engreq.hapibee.mappers.FeedingMapper;
import com.engreq.hapibee.mappers.MaintenanceMapper;
import com.engreq.hapibee.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class InspectionServiceImpl implements InspectionService {

    @Autowired
    MaintenanceRepository maintenanceRepository;
    @Autowired
    FeedingRepository feedingRepository;
    @Autowired
    DiseaseRepository diseaseRepository;
    @Autowired
    ApiaryRepository apiaryRepository;
    @Autowired
    HiveRepository hiveRepository;
    @Autowired
    InspectionScheduleRepository inspectionScheduleRepository;

    @Override
    public InspectionDTO getInspectionsList(UserDetails userDetails) {
        InspectionDTO result = new InspectionDTO();
        result.maintenance = this.getMaintenanceList(userDetails);
        result.feeding = this.getFeedingList(userDetails);
        result.treatments = this.getDiseaseList(userDetails);
        return result;
    }

    private List<MaintenanceDTO> getMaintenanceList(UserDetails userDetails) {
        List<MaintenanceDTO> result = new ArrayList<>();
        // Cast user
        UserEntity user = (UserEntity) userDetails;
        // Find inspections
        List<MaintenanceEntity> list = maintenanceRepository.getInspectionByUser(user);
        for (MaintenanceEntity entity : list) {
            MaintenanceDTO dto = MaintenanceMapper.convertToDTO(entity);
            result.add(dto);
        }
        return result;
    }

    private List<FeedingDTO> getFeedingList(UserDetails userDetails) {
        List<FeedingDTO> result = new ArrayList<>();
        // Cast user
        UserEntity user = (UserEntity) userDetails;
        // Find inspections
        List<FeedingEntity> list = feedingRepository.getFeedingByUser(user);
        for (FeedingEntity entity : list) {
            FeedingDTO dto = FeedingMapper.convertToDTO(entity);
            result.add(dto);
        }
        return result;
    }

    private List<DiseaseDTO> getDiseaseList(UserDetails userDetails) {
        List<DiseaseDTO> result = new ArrayList<>();
        // Cast user
        UserEntity user = (UserEntity) userDetails;
        // Find inspections
        List<DiseaseEntity> list = diseaseRepository.getDiseaseByUser(user);
        for (DiseaseEntity entity : list) {
            DiseaseDTO dto = DiseaseMapper.convertToDTO(entity);
            result.add(dto);
        }
        return result;
    }

    @Override
    public Boolean scheduleInspection(NewInspectionScheduleDTO dto, UserDetails userDetails) {
        boolean apiaryExists = apiaryRepository.existsById(dto.apiaryID);
        if (!apiaryExists) {
            throw new IllegalArgumentException("Invalid apiary");
        }
        LocalDate today = LocalDate.now();
        boolean isDateAfterToday = dto.date.isAfter(today);
        if (!isDateAfterToday) {
            throw new IllegalArgumentException("Invalid date");
        }
        // Cast user
        UserEntity user = (UserEntity) userDetails;
        InspectionScheduleEntity newInspection = InspectionScheduleEntity.builder()
                .apiaryId(dto.apiaryID)
                .date(dto.date)
                .user(user)
                .build();
        inspectionScheduleRepository.save(newInspection);
        return true;
    }

    @Override
    public List<NewInspectionScheduleDTO> getScheduledInspection(UserDetails userDetails) {
        List<NewInspectionScheduleDTO> result = new ArrayList<>();
        // Cast user
        UserEntity user = (UserEntity) userDetails;
        // Find inspections
        List<InspectionScheduleEntity> list = inspectionScheduleRepository.findAllByUser(user);
        for (InspectionScheduleEntity entity : list) {
            NewInspectionScheduleDTO dto = new NewInspectionScheduleDTO();
            dto.apiaryID = entity.getApiaryId();
            dto.date = entity.getDate();
            result.add(dto);
        }
        return result;
    }

    @Override
    public InspectionDTO createInspection(NewInspectionDTO dto, UserDetails userDetails) {
        InspectionDTO result = new InspectionDTO();
        boolean apiaryExists = apiaryRepository.existsById(dto.apiaryID);
        if (!apiaryExists) {
            throw new IllegalArgumentException("Invalid apiary");
        }
        if (dto.maintenance != null) {
            result.maintenance = registerMaintenance(dto.maintenance, userDetails);
        }
        if (dto.feeding != null) {
            result.feeding = registerFeeding(dto.feeding, userDetails);
        }
        if (dto.treatments != null) {
            result.treatments = registerDisease(dto.treatments, userDetails);
        }
        return result;
    }

    public List<MaintenanceDTO> registerMaintenance(NewMaintenanceDTO dto, UserDetails userDetails) {
        List<MaintenanceDTO> result = new ArrayList<>();
        // Validate apiary and hive exist
        List<HiveEntity> lookupHive = hiveRepository.findAllById(dto.hiveID);
        for (HiveEntity hive : lookupHive) {
            if (!hive.getApiary().getId().equals(dto.apiaryID)) {
                throw new IllegalArgumentException("Apiary and Hive do not match");
            }
            // Cast user
            UserEntity user = (UserEntity) userDetails;
            // Create inspection
            EMaintenanceMotive inspectionType = EMaintenanceMotive.valueOf(dto.inspectionType);
            EDisinfectionMotive disinfectionMotive = EDisinfectionMotive.valueOf(dto.motive);
            EDisinfectionMode disinfectionMode = EDisinfectionMode.valueOf(dto.disinfectionMode);
            MaintenanceEntity newInspection = MaintenanceEntity.builder()
                    .hive(hive)
                    .date(dto.date)
                    .temperature(dto.temperature)
                    .humidity(dto.humidity)
                    .inspectionType(inspectionType)
                    .motive(disinfectionMotive)
                    .disinfectionMode(disinfectionMode)
                    .productsUsed(dto.productsUsed)
                    .observations(dto.observations)
                    .user(user)
                    .build();
            MaintenanceEntity savedMaintenance = maintenanceRepository.save(newInspection);
            MaintenanceDTO resultDTO = MaintenanceMapper.convertToDTO(savedMaintenance);
            result.add(resultDTO);
        }
        return result;
    }

    @Override
    public List<FeedingDTO> registerFeeding(NewFeedingDTO dto, UserDetails userDetails) {
        List<FeedingDTO> result = new ArrayList<>();
        // Validate apiary and hive exist
        List<HiveEntity> lookupHive = hiveRepository.findAllById(dto.hiveID);
        for (HiveEntity hive : lookupHive) {
            if (!hive.getApiary().getId().equals(dto.apiaryID)) {
                throw new IllegalArgumentException("Apiary and Hive do not match");
            }
            // Cast user
            UserEntity user = (UserEntity) userDetails;
            // Create feeding
            EOrigin origin = EOrigin.valueOf(dto.origin);
            FeedingEntity newFeeding = FeedingEntity.builder()
                    .hive(hive)
                    .date(dto.date)
                    .product(dto.product)
                    .formula(dto.formula)
                    .origin(origin)
                    .dose(dto.dose)
                    .user(user)
                    .build();
            FeedingEntity savedFeeding = feedingRepository.save(newFeeding);
            FeedingDTO resultDTO = FeedingMapper.convertToDTO(savedFeeding);
            result.add(resultDTO);
        }
        return result;
    }

    @Override
    public List<DiseaseDTO> registerDisease(NewDiseaseDTO dto, UserDetails userDetails) {
        List<DiseaseDTO> result = new ArrayList<>();
        // Validate apiary and hive exist
        List<HiveEntity> lookupHive = hiveRepository.findAllById(dto.hiveID);
        for (HiveEntity hive : lookupHive) {
            if (!hive.getApiary().getId().equals(dto.apiaryID)) {
                throw new IllegalArgumentException("Apiary and Hive do not match");
            }
            // Cast user
            UserEntity user = (UserEntity) userDetails;
            // Create feeding
            EDiseaseType type = EDiseaseType.valueOf(dto.type);
            DiseaseEntity newDisease = DiseaseEntity.builder()
                    .hive(hive)
                    .date(dto.date)
                    .type(type)
                    .disease(dto.disease)
                    .medication(dto.medication)
                    .activeSubstance(dto.activeSubstance)
                    .dose(dto.dose)
                    .duration(dto.duration)
                    .endDate(dto.endDate)
                    .user(user)
                    .build();
            DiseaseEntity savedDisease = diseaseRepository.save(newDisease);
            DiseaseDTO resultDTO = DiseaseMapper.convertToDTO(savedDisease);
            result.add(resultDTO);
        }
        return result;
    }

}
