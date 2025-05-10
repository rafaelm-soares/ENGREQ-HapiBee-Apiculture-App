package com.engreq.hapibee.dto;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.List;

public class NewFeedingDTO {

    public Long apiaryID;
    @NotNull
    public List<Long> hiveID;
    public LocalDate date;
    public String product;
    public String formula;
    public String origin;
    public String dose;

}
