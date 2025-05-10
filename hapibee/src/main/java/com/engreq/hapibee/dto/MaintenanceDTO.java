package com.engreq.hapibee.dto;

import java.time.LocalDate;

public class MaintenanceDTO {

    public Long id;
    public Long apiaryID;
    public Long hiveID;
    public LocalDate date;
    public String temperature;
    public String humidity;
    public String inspectionType;
    public String motive;
    public String disinfectionMode;
    public String productsUsed;
    public String observations;

}
