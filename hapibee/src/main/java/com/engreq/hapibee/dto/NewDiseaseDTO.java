package com.engreq.hapibee.dto;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.List;

public class NewDiseaseDTO {

    public Long apiaryID;
    @NotNull
    public List<Long> hiveID;
    public LocalDate date;
    public String type;
    public String disease;
    public String medication;
    public String activeSubstance;
    public String dose;
    public String duration;
    public LocalDate endDate;

}
