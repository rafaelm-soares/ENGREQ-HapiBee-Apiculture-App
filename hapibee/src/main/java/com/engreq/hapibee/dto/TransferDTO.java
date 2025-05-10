package com.engreq.hapibee.dto;

import java.time.LocalDate;

public class TransferDTO {

    public Long id;
    public LocalDate transferDate;
    public Long apiaryID;
    public LocationDTO location;
    public String isDgavApproved;
    public String isControledZoneApproved;
    public String isTransferApproved;
}
