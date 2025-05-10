package com.engreq.hapibee.service;


import com.engreq.hapibee.dto.*;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface StockDeclarationService {


    List<StockDeclarationDocumentInfoDTO> getStockDeclarationDocumentInfo(UserDetails userDetails);

    List<StockDeclarationApiaryInfoDTO> getStockDeclarationApiaryInfo(Long documentNumber);

    StockDeclarationBeekeeperInfoDTO getStockDeclarationBeekeeperInfo(UserDetails userDetails);

    StockDeclarationDocumentInfoDTO createStockDeclarationDocumentInfo(NewStockDeclarationDocumentInfoDTO dto, UserDetails userDetails);

    List<StockDeclarationApiaryInfoDTO> createStockDeclarationApiaryInfo(List<NewStockDeclarationApiaryInfoDTO> listDto);

    StockDeclarationTotalApiaryInfoDTO getStockDeclarationTotalApiaryInfo(UserDetails userDetails, Long documentNumber);

    boolean approvestockDeclaration(Long id, boolean approvalStatus, UserDetails userDetails);
}
