package com.engreq.hapibee.service;

import com.engreq.hapibee.dto.ApiaryDTO;
import com.engreq.hapibee.dto.HiveDTO;
import com.engreq.hapibee.dto.NewApiaryDTO;
import com.engreq.hapibee.dto.NewHiveDTO;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface ApiaryService {

    List<ApiaryDTO> getApiaryList(UserDetails userDetails);
    ApiaryDTO createApiary(NewApiaryDTO dto, UserDetails userDetails);
    Boolean approveApiary(Long id, Boolean approvalStatus);
    ApiaryDTO updateApiary(ApiaryDTO dto);
    Boolean deleteApiary(Long id);
    List<HiveDTO> getHiveList(UserDetails userDetails);
    HiveDTO createHive(NewHiveDTO dto, UserDetails userDetails);
    HiveDTO updateHive(HiveDTO dto, UserDetails userDetails);

}
