package com.engreq.hapibee.controllers;

import com.engreq.hapibee.dto.*;
import com.engreq.hapibee.service.StockDeclarationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/protected")
public class StockDeclarationController {

    @Autowired
    StockDeclarationService service;


    @GetMapping("/get-stock-declaration-document-info-list")
    public ResponseEntity<List<StockDeclarationDocumentInfoDTO>> getStockDeclarationDocumentInfo(@AuthenticationPrincipal UserDetails userDetails) {
        List<StockDeclarationDocumentInfoDTO> responseDTO = service.getStockDeclarationDocumentInfo(userDetails);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(responseDTO);
    }

    @GetMapping("/get-stock-declaration-apiary-info-list/{documentNumber}")
    public ResponseEntity<List<StockDeclarationApiaryInfoDTO>> getStockDeclarationApiaryInfo(@PathVariable Long documentNumber) {
        List<StockDeclarationApiaryInfoDTO> responseDTO = service.getStockDeclarationApiaryInfo(documentNumber);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(responseDTO);
    }

    @GetMapping("/get-stock-declaration-beekeeper-info")
    public ResponseEntity<StockDeclarationBeekeeperInfoDTO> getStockDeclarationBeekeeperInfo(@AuthenticationPrincipal UserDetails userDetails) {
        StockDeclarationBeekeeperInfoDTO responseDTO = service.getStockDeclarationBeekeeperInfo(userDetails);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(responseDTO);
    }


    @PostMapping("/create-stock-declaration-document-info")
    public ResponseEntity<StockDeclarationDocumentInfoDTO> createStockDeclarationDocumentInfo(@AuthenticationPrincipal UserDetails userDetails,
                                                  @RequestBody NewStockDeclarationDocumentInfoDTO dto) {
        StockDeclarationDocumentInfoDTO responseDTO = service.createStockDeclarationDocumentInfo(dto, userDetails);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(responseDTO);
    }

    @PostMapping("/create-stock-declaration-apiary-info")
    public ResponseEntity<List<StockDeclarationApiaryInfoDTO>> createStockDeclarationApiaryInfo(@AuthenticationPrincipal UserDetails userDetails,
                                                                                                @RequestBody List<NewStockDeclarationApiaryInfoDTO> listDto) {
        List<StockDeclarationApiaryInfoDTO> responseDTO = service.createStockDeclarationApiaryInfo(listDto);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(responseDTO);
    }

    /* Pode ser necessário em deterimento da abordagem a cima
    @PostMapping("/update-stock-declaration-beekeeper-info")
    public ResponseEntity<StockDeclarationBeekeeperInfoDTO> updateStockDeclarationBeekeeperInfo(@RequestBody StockDeclarationBeekeeperInfoDTO dto) {
        StockDeclarationBeekeeperInfoDTO responseDTO = service.updateBeekeeperInfo(dto);
        return ResponseEntity
                .status(HttpStatus.ACCEPTED)
                .body(responseDTO);
    }
     */

    /* Deixar update para depois
    @PostMapping("/update-stock-declaration-document-info")
    public ResponseEntity<StockDeclarationDocumentInfoDTO> updateStockDeclarationDocumentInfo(@RequestBody StockDeclarationDocumentInfoDTO dto) {
        StockDeclarationDocumentInfoDTO responseDTO = service.updateStockDeclarationDocumentInfo(dto);
        return ResponseEntity
                .status(HttpStatus.ACCEPTED)
                .body(responseDTO);
    }
     */

        /* Deixar update para depois
    @PostMapping("/update-stock-declaration-apiary-info")
    public ResponseEntity<StockDeclarationApiaryInfoDTO> updateStockDeclarationApiaryInfo(@RequestBody StockDeclarationApiaryInfoDTO dto) {
        StockDeclarationApiaryInfoDTO responseDTO = service.updateStockDeclarationApiaryInfo(dto);
        return ResponseEntity
                .status(HttpStatus.ACCEPTED)
                .body(responseDTO);
    }
     */

    @GetMapping("/get-stock-declaration-total-apiary-info/{documentNumber}")
    public ResponseEntity<StockDeclarationTotalApiaryInfoDTO> getStockDeclarationTotalApiaryInfo(@AuthenticationPrincipal UserDetails userDetails,
                                                                                                 @PathVariable Long documentNumber) {
        StockDeclarationTotalApiaryInfoDTO responseDTO = service.getStockDeclarationTotalApiaryInfo(userDetails, documentNumber);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(responseDTO);
    }

     @PatchMapping("/approve-stockDeclaration/{documentNumber}")
    public ResponseEntity<ResponseMessageDTO> approveApiary(@AuthenticationPrincipal UserDetails userDetails,
                                                            @PathVariable Long documentNumber,
                                                            @RequestParam boolean approvalStatus) {
        boolean response = service.approvestockDeclaration(documentNumber, approvalStatus,userDetails);
        if (response) {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new ResponseMessageDTO("Stock declaration approval status updated."));
        }
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(new ResponseMessageDTO("Something went wrong."));
    }

    /* Pode ser útil para depois
    @DeleteMapping("/delete-apiary/{id}")
    public ResponseEntity<ResponseMessageDTO> deleteApiary(@PathVariable Long id) {
        boolean response = service.deleteApiary(id);
        if (response) {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new ResponseMessageDTO("Apiary deleted."));
        }
        return ResponseEntity
                .status(HttpStatus.ACCEPTED)
                .body(new ResponseMessageDTO("Something went wrong."));
    }
     */

}
