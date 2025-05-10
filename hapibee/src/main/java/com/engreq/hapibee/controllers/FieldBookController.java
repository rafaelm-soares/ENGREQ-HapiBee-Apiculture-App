package com.engreq.hapibee.controllers;

import com.engreq.hapibee.dto.*;
import com.engreq.hapibee.service.HiveSplitService;
import com.engreq.hapibee.service.InspectionService;
import com.engreq.hapibee.service.TransferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/protected/field-book")
public class FieldBookController {

    @Autowired
    InspectionService inspectionService;

    @Autowired
    HiveSplitService hiveSplitService;

    @Autowired
    TransferService transferService;

    @GetMapping("/get-inspection-list")
    public ResponseEntity<InspectionDTO> getInspectionList(@AuthenticationPrincipal UserDetails userDetails) {
        InspectionDTO responseDTO = inspectionService.getInspectionsList(userDetails);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(responseDTO);
    }

    @PostMapping("/schedule-inspection")
    public ResponseEntity<Boolean> scheduleInspection(@AuthenticationPrincipal UserDetails userDetails,
                                                      @RequestBody NewInspectionScheduleDTO dto) {
        boolean responseDTO = inspectionService.scheduleInspection(dto, userDetails);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(responseDTO);
    }

    @GetMapping("/schedule-inspection")
    public ResponseEntity<List<NewInspectionScheduleDTO>> getScheduledInspection(@AuthenticationPrincipal UserDetails userDetails) {
        List<NewInspectionScheduleDTO> responseDTO = inspectionService.getScheduledInspection(userDetails);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(responseDTO);
    }

    @PostMapping("/create-inspection")
    public ResponseEntity<InspectionDTO> createInspection(@AuthenticationPrincipal UserDetails userDetails,
                                                          @RequestBody NewInspectionDTO dto) {
        InspectionDTO responseDTO = inspectionService.createInspection(dto, userDetails);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(responseDTO);
    }

    @PostMapping("/register-maintenance")
    public ResponseEntity<List<MaintenanceDTO>> registerMaintenance(@AuthenticationPrincipal UserDetails userDetails,
                                                                    @RequestBody NewMaintenanceDTO dto) {
        List<MaintenanceDTO> responseDTO = inspectionService.registerMaintenance(dto, userDetails);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(responseDTO);
    }

    @PostMapping("/register-feeding")
    public ResponseEntity<List<FeedingDTO>> registerFeeding(@AuthenticationPrincipal UserDetails userDetails,
                                                            @RequestBody NewFeedingDTO dto) {
        List<FeedingDTO> responseDTO = inspectionService.registerFeeding(dto, userDetails);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(responseDTO);
    }

    @PostMapping("/register-disease")
    public ResponseEntity<List<DiseaseDTO>> registerDisease(@AuthenticationPrincipal UserDetails userDetails,
                                                            @RequestBody NewDiseaseDTO dto) {
        List<DiseaseDTO> responseDTO = inspectionService.registerDisease(dto, userDetails);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(responseDTO);
    }

    @PostMapping("/create-transfer")
    public ResponseEntity<TransferDTO> createTransfer(@AuthenticationPrincipal UserDetails userDetails,
                                                      @RequestBody NewTransferDTO dto) {
        TransferDTO responseDTO = transferService.createTransfer(dto, userDetails);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(responseDTO);
    }

    @GetMapping("/get-transfers-list")
    public ResponseEntity<List<TransferDTO>> getTransferList(@AuthenticationPrincipal UserDetails userDetails) {
        List<TransferDTO> responseDTO = transferService.getTransferList(userDetails);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(responseDTO);
    }

    @PostMapping("/register-split-hive")
    public ResponseEntity<HiveSplitDTO> createSplitHive(@AuthenticationPrincipal UserDetails userDetails,
                                                        @RequestBody NewHiveSplitDTO dto) {

        HiveSplitDTO responseDTO = hiveSplitService.createHiveSplit(dto, userDetails);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(responseDTO);
    }

    @GetMapping("/get-hive-split-list")
    public ResponseEntity<List<HiveSplitDTO>> getHiveSplitList(@AuthenticationPrincipal UserDetails userDetails) {
        List<HiveSplitDTO> responseDTO = hiveSplitService.getHiveSplitList(userDetails);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(responseDTO);
    }

    @PostMapping("/update-hive-split")
    public ResponseEntity<HiveSplitDTO> updateSplitHive(@RequestBody HiveSplitDTO dto) {

        HiveSplitDTO responseDTO = hiveSplitService.updateHiveSplit(dto);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(responseDTO);
    }

    @PatchMapping("/approve-transfer/{id}")
    public ResponseEntity<ResponseMessageDTO> approveTransferStatus(@AuthenticationPrincipal UserDetails userDetails,
                                                                    @PathVariable Long id,
                                                                    @RequestParam(required = false) Boolean approvalDgavStatus,
                                                                    @RequestParam(required = false) Boolean approvalControlledZonesStatus) {
        boolean response = transferService.approveTransferStatus(id, approvalDgavStatus, approvalControlledZonesStatus, userDetails);
        if (response) {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new ResponseMessageDTO("Transfer approval status updated."));
        }
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(new ResponseMessageDTO("Something went wrong."));
    }

    @DeleteMapping("/delete-hive-split/{id}")
    public ResponseEntity<ResponseMessageDTO> deleteApiary(@PathVariable Long id) {
        boolean response = hiveSplitService.deleteHiveSplit(id);
        if (response) {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new ResponseMessageDTO("Hive split deleted."));
        }
        return ResponseEntity
                .status(HttpStatus.ACCEPTED)
                .body(new ResponseMessageDTO("Something went wrong."));
    }
}
