package com.engreq.hapibee.service;

import com.engreq.hapibee.dto.*;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface InspectionService {

    InspectionDTO getInspectionsList(UserDetails userDetails);

    Boolean scheduleInspection(NewInspectionScheduleDTO dto, UserDetails userDetails);

    List<NewInspectionScheduleDTO> getScheduledInspection(UserDetails userDetails);

    InspectionDTO createInspection(NewInspectionDTO dto, UserDetails userDetails);

    List<MaintenanceDTO> registerMaintenance(NewMaintenanceDTO dto, UserDetails userDetails);

    List<FeedingDTO> registerFeeding(NewFeedingDTO dto, UserDetails userDetails);

    List<DiseaseDTO> registerDisease(NewDiseaseDTO dto, UserDetails userDetails);

}
