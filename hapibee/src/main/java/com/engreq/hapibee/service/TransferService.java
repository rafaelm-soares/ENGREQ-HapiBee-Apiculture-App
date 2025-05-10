package com.engreq.hapibee.service;

import com.engreq.hapibee.dto.ApiaryDTO;
import com.engreq.hapibee.dto.NewApiaryDTO;
import com.engreq.hapibee.dto.NewTransferDTO;
import com.engreq.hapibee.dto.TransferDTO;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface TransferService {

    List<TransferDTO> getTransferList(UserDetails userDetails);
    TransferDTO createTransfer(NewTransferDTO dto, UserDetails userDetails);
    Boolean approveTransferStatus(Long id, Boolean approvalDgavStatus, Boolean approvalControlledZonesStatus , UserDetails userDetails);
}
