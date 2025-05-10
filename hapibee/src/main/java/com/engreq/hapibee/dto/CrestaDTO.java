package com.engreq.hapibee.dto;

import com.engreq.hapibee.entity.ApiaryEntity;
import com.engreq.hapibee.entity.HiveEntity;
import com.engreq.hapibee.enums.EProductType;
import com.engreq.hapibee.enums.EQuantityType;
import jakarta.persistence.*;

import java.time.LocalDate;

public class CrestaDTO {

    public Long id;
    public Long apiaryID;
    public Long hiveID;
    public Long nrOfBoards;
    public String ProductType;
    public Long quantity;
    public String quantityType;
    public LocalDate CrestaDate;

}
