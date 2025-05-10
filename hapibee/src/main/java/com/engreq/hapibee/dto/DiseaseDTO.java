package com.engreq.hapibee.dto;

import java.time.LocalDate;

public class DiseaseDTO {

    public Long id;
    public Long apiaryID;
    public Long hiveID;
    public LocalDate date;
    public String type;
    public String disease;
    public String medication;
    public String activeSubstance;
    public String dose;
    public String duration;
    public LocalDate endDate;

}
