package com.engreq.hapibee.dto;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.List;

public class NewHiveSplitDTO {

    public Long apiaryID;                   // apiario origem
    public Long hiveOrigID;                 // colmeia origem
    @NotNull
    public List<Long> listOfHiveDestID;     // lista de colmeias destino
    public String reproductionQueen;        // rainhas
    public String reproductionManagement;   // colmeias
    public LocalDate hiveSplitDate;             // data do desdobramento
    public String productionType;           // modo de produção
    public Long quantitiy;                  // quantidade
    public String quantityType;             // nº ou Kg

}
