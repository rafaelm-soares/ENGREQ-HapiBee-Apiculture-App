package com.engreq.hapibee.service;

import com.engreq.hapibee.dto.*;
import com.engreq.hapibee.entity.*;
import com.engreq.hapibee.enums.EApiaryApprovalStatus;
import com.engreq.hapibee.enums.EDeclarationType;
import com.engreq.hapibee.enums.EStockDeclarationInfoEntityStatus;
import com.engreq.hapibee.mappers.*;
import com.engreq.hapibee.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class StockDeclarationServiceImpl implements StockDeclarationService {


    @Autowired
    StockDeclarationDocumentInfoRepository stockDeclarationDocumentInfoRepository;

    @Autowired
    StockDeclarationApiaryInfoRepository stockDeclarationApiaryInfoRepository;

    @Autowired
    BeekeeperRepository beekeeperRepository;

    @Autowired
    LocationRepository locationRepository;

    @Autowired
    ApiaryRepository apiaryRepository;
    @Autowired
    private HiveRepository hiveRepository;

    @Autowired
    SendEmailService emailService;

    @Override
    public List<StockDeclarationDocumentInfoDTO> getStockDeclarationDocumentInfo(UserDetails userDetails) {
        List<StockDeclarationDocumentInfoDTO> result = new ArrayList<>();
        // Cast user
        UserEntity user = (UserEntity) userDetails;

        //Get official id from user
        String officialId = beekeeperRepository.getBeekeeperByUser(user).getOfficialId();

        // Find documents by user
        List<StockDeclarationDocumentInfoEntity> list = stockDeclarationDocumentInfoRepository.getStockDelcarationDocumentByOfficialBeekeeperId(officialId);
        for (StockDeclarationDocumentInfoEntity entity : list) {
            StockDeclarationDocumentInfoDTO dto = StockDeclarationDocumentMapper.convertToDTO(entity);
            // Add total details
            StockDeclarationTotalApiaryInfoDTO details = this.getStockDeclarationTotalApiaryInfo(userDetails, entity.getDocumentNumber());
            dto.details = details;
            result.add(dto);
        }
        return result;
    }

    @Override
    public List<StockDeclarationApiaryInfoDTO> getStockDeclarationApiaryInfo(Long documentNumber) {
        List<StockDeclarationApiaryInfoDTO> result = new ArrayList<>();
        // Find apiary list by documentNumber
        List<StockDeclarationApiaryInfoEntity> list = stockDeclarationApiaryInfoRepository.getStockDelcarationApiaryByDocumentNumber(documentNumber);
        for (StockDeclarationApiaryInfoEntity entity : list) {
            StockDeclarationApiaryInfoDTO dto = StockDeclarationApiaryMapper.convertToDTO(entity);
            result.add(dto);
        }
        return result;
    }

    @Override
    public StockDeclarationBeekeeperInfoDTO getStockDeclarationBeekeeperInfo(UserDetails userDetails) {
        // Cast user
        UserEntity user = (UserEntity) userDetails;
        // Find beekeeperby by user id
        BeekeeperEntity entity = beekeeperRepository.getBeekeeperByUser(user);
        return StockDeclarationBeekeeperMapper.convertToDTO(entity);
    }

    @Override
    public StockDeclarationDocumentInfoDTO createStockDeclarationDocumentInfo(NewStockDeclarationDocumentInfoDTO dto, UserDetails userDetails) {
        // Cast user
        UserEntity user = (UserEntity) userDetails;
        //Get official beekeperId from userID connection
        String officialID = beekeeperRepository.getBeekeeperByUser(user).getOfficialId();
        // Create stock declaration document info
        EDeclarationType eDeclarationType = EDeclarationType.valueOf(dto.declarationType);
        EStockDeclarationInfoEntityStatus approvalStatus = EStockDeclarationInfoEntityStatus.PENDING;
        StockDeclarationDocumentInfoEntity newEntity = StockDeclarationDocumentInfoEntity.builder()
                .declarationType(eDeclarationType)
                .year(dto.year)
                .version(dto.version)
                .officialBeekeeperId(officialID)
                .unidadeOrganica(dto.unidadeOrganica)
                .isApproved(approvalStatus)
                .build();
        StockDeclarationDocumentInfoEntity savedEntity = stockDeclarationDocumentInfoRepository.save(newEntity);
        return StockDeclarationDocumentMapper.convertToDTO(savedEntity);
    }

    @Override
    public List<StockDeclarationApiaryInfoDTO> createStockDeclarationApiaryInfo(List<NewStockDeclarationApiaryInfoDTO> listDto) {
        List<StockDeclarationApiaryInfoDTO> result = new ArrayList<>();
        for (NewStockDeclarationApiaryInfoDTO dto : listDto) {
            // Location
            LocationEntity savedLocation = this.verifyAndGetLocation(dto.apiaryLocation);
            StockDeclarationApiaryInfoEntity newEntity = StockDeclarationApiaryInfoEntity.builder()
                    .apiaryId(dto.apiaryId)
                    .apiaryLocation(savedLocation)
                    .colonyNumber(dto.colonynumber)
                    .controledZone(dto.controledZone)
                    .documentNumber(dto.documentNumber)
                    .hiveNumber(dto.hiveNumber)
                    .intensiveCulture(dto.culturaIntensiva)
                    .placeName(dto.placeName)
                    .hiveSuperNumber(dto.hiveSuperNumber)
                    .transfer(dto.transfer)
                    .build();
            StockDeclarationApiaryInfoEntity savedEntity = stockDeclarationApiaryInfoRepository.save(newEntity);
            StockDeclarationApiaryInfoDTO savedEntityDTO = StockDeclarationApiaryMapper.convertToDTO(savedEntity);
            result.add(savedEntityDTO);
        }
        return result;
    }

    @Override
    public StockDeclarationTotalApiaryInfoDTO getStockDeclarationTotalApiaryInfo(UserDetails userDetails, Long documentNumber) {
        // Cast user
        UserEntity user = (UserEntity) userDetails;

        List<StockDeclarationApiaryInfoDTO> listApiaryInfo = new ArrayList<>();

        //Get list of all the apiarys for a beekeeper
        List<ApiaryEntity> listApiary = apiaryRepository.getApiaryByUser(user);

        // Get all hives for each apiary
        for (ApiaryEntity apiary : listApiary) {
            StockDeclarationApiaryInfoDTO stockDeclarationApiaryInfoDTO = new StockDeclarationApiaryInfoDTO();

            stockDeclarationApiaryInfoDTO.hiveNumber = apiary.getNumberOfHives();

            stockDeclarationApiaryInfoDTO.apiaryId = apiary.getId();

            /* Probably add to backlog in order to upgrade future development
            stockDeclarationApiaryInfoDTO.culturaIntensiva = checkIfCulturaIsIntensiva(apiary);
             */

            /*Add to backlog or try to do for this sprint
            stockDeclarationApiaryInfoDTO.transfer = checkIfWasTranfered(apiary);
             */

            /*
            stockDeclarationApiaryInfoDTO.controledZone = checkIfIsInControledZone(apiary);
             */

            stockDeclarationApiaryInfoDTO.documentNumber = documentNumber;

            //Creates Location for apiary in delcarion
            stockDeclarationApiaryInfoDTO.apiaryLocation = this.mapLocationToDTO(apiary);

            //Get list of all the hives that a apiary has
            List<HiveEntity> listHivesOfApiary = hiveRepository.findAllByApiary(apiary);

            //Calculates the total super hives that a apiary has, goes to all the hives that one apiary has then cheks
            // all the super hives for each hive
            stockDeclarationApiaryInfoDTO.hiveSuperNumber = getHiveSuperNumberForApiary(listHivesOfApiary);

            listApiaryInfo.add(stockDeclarationApiaryInfoDTO);
        }

        //Get number of super hives of each hive ou seja calcula o número de nucles/alças/cortiços de uma colmeia

        //Calculates total of hives of a given beekeeper
        int totalHiveNumber = this.calculateTotalHiveNumber(listApiaryInfo);

        //Calculates total of super hives of a given beekeeper
        int totalHiveSuperNumber = this.calculateTotalHiveSuperNumber(listApiaryInfo);


        return StockDeclarationTotalApiaryInfoMapper.convertToDTO(listApiaryInfo, totalHiveNumber, totalHiveSuperNumber);
    }

    private LocationDTO mapLocationToDTO(ApiaryEntity apiary) {
        LocationDTO location = new LocationDTO();
        location.municipality = apiary.getLocation().getMunicipality();
        location.parish = apiary.getLocation().getParish();
        location.place = apiary.getLocation().getPlace();
        location.latitude = apiary.getLocation().getLatitude();
        location.longitude = apiary.getLocation().getLongitude();
        return location;
    }

    private int getHiveSuperNumberForApiary(List<HiveEntity> listHivesOfApiary) {
        int totalSuperHivesInOneApiary = 0;
        for (HiveEntity entity : listHivesOfApiary) {
            totalSuperHivesInOneApiary = totalSuperHivesInOneApiary + entity.getHiveSuperList().size();
        }
        return totalSuperHivesInOneApiary;
    }

    private int calculateTotalHiveNumber(List<StockDeclarationApiaryInfoDTO> listDTO) {
        int totalHiveNumber = 0;
        for (StockDeclarationApiaryInfoDTO entity : listDTO) {
            totalHiveNumber = totalHiveNumber + entity.hiveNumber;
        }
        return totalHiveNumber;
    }

    private int calculateTotalHiveSuperNumber(List<StockDeclarationApiaryInfoDTO> listDTO) {
        int totalHiveSuperNumber = 0;
        for (StockDeclarationApiaryInfoDTO entity : listDTO) {
            totalHiveSuperNumber = totalHiveSuperNumber + entity.hiveSuperNumber;
        }
        return totalHiveSuperNumber;
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
    public boolean approvestockDeclaration(Long id, boolean approvalStatus, UserDetails userDetails) {
        // Cast user
        UserEntity user = (UserEntity) userDetails;

        Optional<StockDeclarationDocumentInfoEntity> lookup = stockDeclarationDocumentInfoRepository.findStockDeclarationDocumentInfoEntitiesByDocumentNumber(id);
        if (lookup.isPresent()) {
            StockDeclarationDocumentInfoEntity found = lookup.get();
            if (approvalStatus) {
                found.setIsApproved(EStockDeclarationInfoEntityStatus.APPROVED);
            } else {
                found.setIsApproved(EStockDeclarationInfoEntityStatus.DENIED);
            }
            StockDeclarationDocumentInfoEntity updated = stockDeclarationDocumentInfoRepository.save(found);

            String userEmail = user.getEmail();
            String userFirstName = user.getFirstName();
            String userLastName = user.getLastName();
            String status = approvalStatus ? "APROVADO" : "RECUSADO";
            String message = "Olá " + userFirstName + " " + userLastName + ",\n\nO documento com o id " + found.getDocumentNumber() + " foi " + status + ".";
            emailService.enviarEmail(userEmail, "Aprovação da Declaração", message);
            return true;
        }
        return false;
    }
}
