package com.engreq.hapibee.dto;

public class StockDeclarationApiaryInfoDTO {

    public Long apiaryId;
    //StockDeclarationApiaryInfo
    public LocationDTO apiaryLocation;
    public String placeName;
    public boolean culturaIntensiva;
    //número de apiários
    public int hiveNumber;
    //número de cortiços/núcleos/alças
    public int hiveSuperNumber;
    //número total de colonias, para ser tratado como melhoria
    //public int colonyNumber;
    public boolean transfer;
    public boolean controledZone;

    public Long documentNumber;
}
