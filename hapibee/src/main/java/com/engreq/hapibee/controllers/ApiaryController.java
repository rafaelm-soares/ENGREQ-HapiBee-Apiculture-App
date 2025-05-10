package com.engreq.hapibee.controllers;

import com.engreq.hapibee.dto.*;
import com.engreq.hapibee.service.ApiaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/protected")
public class ApiaryController {

    @Autowired
    ApiaryService service;

    @GetMapping("/get-apiary-list")
    public ResponseEntity<List<ApiaryDTO>> getApiaryList(@AuthenticationPrincipal UserDetails userDetails) {
        List<ApiaryDTO> responseDTO = service.getApiaryList(userDetails);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(responseDTO);
    }

    @PostMapping("/create-apiary")
    public ResponseEntity<ApiaryDTO> createApiary(@AuthenticationPrincipal UserDetails userDetails,
                                                  @RequestBody NewApiaryDTO dto) {
        ApiaryDTO responseDTO = service.createApiary(dto, userDetails);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(responseDTO);
    }

    @PatchMapping("/approve-apiary/{id}")
    public ResponseEntity<ResponseMessageDTO> approveApiary(@AuthenticationPrincipal UserDetails userDetails,
                                                            @PathVariable Long id,
                                                            @RequestParam boolean approvalStatus) {
        boolean response = service.approveApiary(id, approvalStatus);
        if (response) {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new ResponseMessageDTO("Apiary approval status updated."));
        }
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(new ResponseMessageDTO("Something went wrong."));
    }

    @PostMapping("/update-apiary")
    public ResponseEntity<ApiaryDTO> updateApiary(@RequestBody ApiaryDTO dto) {
        ApiaryDTO responseDTO = service.updateApiary(dto);
        return ResponseEntity
                .status(HttpStatus.ACCEPTED)
                .body(responseDTO);
    }

    @DeleteMapping("/delete-apiary/{id}")
    public ResponseEntity<ResponseMessageDTO> deleteApiary(@PathVariable Long id) {
        boolean response = service.deleteApiary(id);
        if (response) {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new ResponseMessageDTO("Apiary deleted."));
        }
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(new ResponseMessageDTO("Something went wrong."));
    }

    @GetMapping("/get-hive-list")
    public ResponseEntity<List<HiveDTO>> getHiveList(@AuthenticationPrincipal UserDetails userDetails) {
        List<HiveDTO> responseDTO = service.getHiveList(userDetails);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(responseDTO);
    }

    @PostMapping("/create-hive")
    public ResponseEntity<HiveDTO> createHive(@AuthenticationPrincipal UserDetails userDetails,
                                              @RequestBody NewHiveDTO dto) {
        HiveDTO responseDTO = service.createHive(dto, userDetails);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(responseDTO);
    }

    @PostMapping("/update-hive")
    public ResponseEntity<HiveDTO> updateHive(@AuthenticationPrincipal UserDetails userDetails,
                                              @RequestBody HiveDTO dto) {
        HiveDTO responseDTO = service.updateHive(dto, userDetails);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(responseDTO);
    }

}
