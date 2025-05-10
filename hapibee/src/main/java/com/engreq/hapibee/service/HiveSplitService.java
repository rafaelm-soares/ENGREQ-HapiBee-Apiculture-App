package com.engreq.hapibee.service;

import com.engreq.hapibee.dto.*;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface HiveSplitService {

    List<HiveSplitDTO> getHiveSplitList(UserDetails userDetails);
    HiveSplitDTO getHiveSplit(HiveSplitDTO dto);
    HiveSplitDTO createHiveSplit(NewHiveSplitDTO dto, UserDetails userDetails);
    HiveSplitDTO updateHiveSplit(HiveSplitDTO dto);
    Boolean deleteHiveSplit(Long id);

}
