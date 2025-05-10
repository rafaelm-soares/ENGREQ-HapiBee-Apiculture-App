package com.engreq.hapibee.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

/**
 * Declaração existências informação sobre apiário
 */
@Entity
@Table(name = "stockDeclarationApiaryInfo")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StockDeclarationApiaryInfoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private long apiaryId;
    @OneToOne
    //@JoinColumn(name = "apiary_location_id")
    private LocationEntity apiaryLocation;

    private String placeName;

    private boolean intensiveCulture;

    private int hiveNumber;

    private int hiveSuperNumber;

    private int colonyNumber;

    private boolean transfer;

    private boolean controledZone;


    /*
    @OnetoOne
    private StockDeclarationDocumentInfoEntity documentIdentifier;
     */

    private Long documentNumber;

    public LocationEntity getApiaryLocation() {
        return apiaryLocation;
    }

    public void setApiaryLocation(LocationEntity apiaryLocation) {
        this.apiaryLocation = apiaryLocation;
    }

    /* Caso seja através do beekeeper
    @OnetoOne
    private StockDeclarationDocumentInfoEntity documentIdentifier;
     */

    public Long getDocumentNumber() {return documentNumber;}

    public int getColonyNumber() {return colonyNumber;}

    public int getHiveNumber() {return hiveNumber;}

    public int getHiveSuperNumber() {return hiveSuperNumber;}

    public long getApiaryId() {return apiaryId;}

    public Long getId() {return id;}

    public String getPlaceName() {return placeName;}

    public boolean isControledZone() {return controledZone;}

    public boolean isIntensiveCulture() {return intensiveCulture;}

    public boolean isTransfer() {return transfer;}

    public void setDocumentNumber(Long documentNumber) {this.documentNumber = documentNumber;}

    public void setApiaryId(long apiaryId) {this.apiaryId = apiaryId;}

    public void setColonyNumber(int colonyNumber) {this.colonyNumber = colonyNumber;}

    public void setControledZone(boolean controledZone) {this.controledZone = controledZone;}

    public void setHiveNumber(int hiveNumber) {this.hiveNumber = hiveNumber;}

    public void setHiveSuperNumber(int hiveSuperNumber) {this.hiveSuperNumber = hiveSuperNumber;}

    public void setId(Long id) {this.id = id;}

    public void setIntensiveCulture(boolean intensiveCulture) {this.intensiveCulture = intensiveCulture;}

    public void setPlaceName(String placeName) {this.placeName = placeName;}

    public void setTransfer(boolean transfer) {this.transfer = transfer;}
}