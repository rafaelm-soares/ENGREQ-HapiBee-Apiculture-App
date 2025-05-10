package com.engreq.hapibee.service;


import com.engreq.hapibee.dto.ApiaryDTO;
import com.engreq.hapibee.dto.CrestaDTO;
import com.engreq.hapibee.dto.NewCrestaDTO;
import com.engreq.hapibee.dto.TransferDTO;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface CrestService {

    List<CrestaDTO> getCrestaList(UserDetails userDetails);
    CrestaDTO createCresta(NewCrestaDTO dto, UserDetails userDetails);
    CrestaDTO updateCresta(CrestaDTO dto);
}
