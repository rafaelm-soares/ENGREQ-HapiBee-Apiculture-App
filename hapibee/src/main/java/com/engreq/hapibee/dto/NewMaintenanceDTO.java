package com.engreq.hapibee.dto;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.List;

public class NewMaintenanceDTO {

    public Long apiaryID;
    @NotNull
    public List<Long> hiveID;
    public LocalDate date;
    public String temperature;
    public String humidity;
    public String inspectionType;
    public String motive;
    public String disinfectionMode;
    public String productsUsed;
    public String observations;

}
