package com.engreq.hapibee.controllers;

import com.engreq.hapibee.dto.*;
import com.engreq.hapibee.service.ApiaryService;
import com.engreq.hapibee.service.CrestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/protected")
public class CrestaController {
    @Autowired
    CrestService service;

    @PostMapping("/create-cresta")
    public ResponseEntity<CrestaDTO> createCresta(@AuthenticationPrincipal UserDetails userDetails,
                                                  @RequestBody NewCrestaDTO dto) {
        CrestaDTO responseDTO = service.createCresta(dto, userDetails);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(responseDTO);
    }

    @PostMapping("/update-cresta")
    public ResponseEntity<CrestaDTO> updateCresta(@RequestBody CrestaDTO dto) {
        CrestaDTO responseDTO = service.updateCresta(dto);
        return ResponseEntity
                .status(HttpStatus.ACCEPTED)
                .body(responseDTO);
    }

    @GetMapping("/get-cresta-list")
    public ResponseEntity<List<CrestaDTO>> getCrestaList(@AuthenticationPrincipal UserDetails userDetails) {
        List<CrestaDTO> responseDTO = service.getCrestaList(userDetails);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(responseDTO);
    }

}
