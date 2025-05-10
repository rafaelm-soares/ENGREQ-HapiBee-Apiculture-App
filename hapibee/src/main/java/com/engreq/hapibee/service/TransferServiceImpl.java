package com.engreq.hapibee.service;

import com.engreq.hapibee.dto.*;
import com.engreq.hapibee.entity.ApiaryEntity;
import com.engreq.hapibee.entity.LocationEntity;
import com.engreq.hapibee.entity.TransferEntity;
import com.engreq.hapibee.entity.UserEntity;
import com.engreq.hapibee.enums.EApiaryApprovalStatus;
import com.engreq.hapibee.mappers.ApiaryMapper;
import com.engreq.hapibee.mappers.TransferMapper;
import com.engreq.hapibee.repositories.ApiaryRepository;
import com.engreq.hapibee.repositories.LocationRepository;
import com.engreq.hapibee.repositories.TransferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TransferServiceImpl implements TransferService {

    @Autowired
    TransferRepository transferRepository;
    @Autowired
    ApiaryRepository apiaryRepository;
    @Autowired
    LocationRepository locationRepository;
    @Autowired
    SendEmailService emailService;

    @Override
    public List<TransferDTO> getTransferList(UserDetails userDetails) {
        List<TransferDTO> result = new ArrayList<>();
        // Cast user
        UserEntity user = (UserEntity) userDetails;
        // Find apiaries
        List<TransferEntity> list = transferRepository.getTransferByUser(user);
        for (TransferEntity entity : list) {
            TransferDTO dto = TransferMapper.convertToDTO(entity);
            result.add(dto);
        }
        return result;
    }

    @Override
    public TransferDTO createTransfer(NewTransferDTO dto, UserDetails userDetails) {
        Optional<ApiaryEntity> lookup = apiaryRepository.findById(dto.apiaryID);
        if (lookup.isPresent()) {
            ApiaryEntity apiary = lookup.get();
            // Cast user
            UserEntity user = (UserEntity) userDetails;
            // Location
            LocationEntity savedLocation = this.verifyAndGetLocation(dto.location);
            // Create transfer
            EApiaryApprovalStatus status = EApiaryApprovalStatus.PENDING;
            TransferEntity newTransfer = TransferEntity.builder()
                    .location(savedLocation)
                    .controledZonesStatus(status)
                    .dgavStatus(status)
                    .transferStatus(status)
                    .apiary(apiary)
                    .transferDate(dto.transferDate)
                    .user(user)
                    .build();
            TransferEntity savedTransfer = transferRepository.save(newTransfer);
            return TransferMapper.convertToDTO(savedTransfer);
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
        LocationEntity savedRepoLocation = locationRepository.save(newLocation);
        return savedRepoLocation;
    }
    @Override
    public Boolean approveTransferStatus(Long id, Boolean approvalDgavStatus, Boolean approvalControlledZonesStatus, UserDetails userDetails) {
        Optional<TransferEntity> lookup = transferRepository.findById(id);
        UserEntity user = (UserEntity) userDetails;
        if (lookup.isPresent()) {
            TransferEntity found = lookup.get();
            if(approvalDgavStatus != null) { // caso seja null mantem o pedido como PENDING
                if (approvalDgavStatus) {
                    EApiaryApprovalStatus status = EApiaryApprovalStatus.APPROVED;
                    found.setDgavStatus(status);
                } else if (!approvalDgavStatus) {
                    EApiaryApprovalStatus status = EApiaryApprovalStatus.DENIED;
                    found.setDgavStatus(status);
                }
            }
            if(approvalControlledZonesStatus != null) { // caso seja null mantem o pedido como PENDING
                if (approvalControlledZonesStatus) {
                    EApiaryApprovalStatus status = EApiaryApprovalStatus.APPROVED;
                    found.setControledZonesStatus(status);
                } else if (!approvalControlledZonesStatus) {
                    EApiaryApprovalStatus status = EApiaryApprovalStatus.DENIED;
                    found.setControledZonesStatus(status);
                }
            }
            if(found.getControledZonesStatus() == EApiaryApprovalStatus.APPROVED && found.getDgavStatus() == EApiaryApprovalStatus.APPROVED ){
                ApiaryEntity apiary = found.getApiary();
                LocationEntity newLocation = found.getLocation();
                apiary.setLocation(newLocation);
                ApiaryEntity updatedApiary = apiaryRepository.save(apiary);
                found.setTransferStatus(EApiaryApprovalStatus.APPROVED);
                emailService.enviarEmail(user.getEmail(), "Aprovação de Transumância", "Olá " + user.getFirstName()+ " " + user.getLastName() + ",\n\nA Transumância com o id " + id + " foi aprovada pelas 2 entidades reguladoras. \nJá pode proceder a movimentação da mesma.\n\nCom os melhores cumprimentos,\nDesenvolvedores HappieBee.");

            }else if(found.getControledZonesStatus() == EApiaryApprovalStatus.DENIED || found.getDgavStatus() == EApiaryApprovalStatus.DENIED){
                found.setTransferStatus(EApiaryApprovalStatus.DENIED);
                emailService.enviarEmail(user.getEmail(), "Rejeição de Transumância", "Olá " + user.getFirstName()+ " " + user.getLastName() + ",\n\nA Transumância com o id " + id + " foi rejeitada por pelo menos umas das 2 entidades reguladoras. \nEstá proibido de proceder a movimentação da mesma.\n\nCom os melhores cumprimentos,\nDesenvolvedores HappieBee.");

            }
            TransferEntity updated = transferRepository.save(found);
            return true;
        }
        return false;
    }
}
