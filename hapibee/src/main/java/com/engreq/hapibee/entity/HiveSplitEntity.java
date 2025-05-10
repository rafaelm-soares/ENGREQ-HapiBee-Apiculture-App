package com.engreq.hapibee.entity;

import com.engreq.hapibee.enums.*;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.util.List;

/**
 * Caderno de campo
 * Desdobramento
 */
@Entity
@Table(name = "hive-split")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HiveSplitEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private ApiaryEntity apiary;
    @ManyToOne
    private HiveEntity hiveOrig;
    @ManyToMany
    private List<HiveEntity> hiveDestList;  // Lista de apiarios destino
    private LocalDate hiveSplitDate;            // Data do desdobramento
    @Enumerated(EnumType.STRING)
    private EReproductionQueen reproductionQueen; // Rainhas
    @Enumerated(EnumType.STRING)
    private EReproductionManagement reproductionManagement; // Colmeias
    @Enumerated(EnumType.STRING)
    private EProductionType productionType;     // Modo de produção
    public Long quantitiy;  // Quantidade
    @Enumerated(EnumType.STRING)
    private EQuantityType quantityType;     // Nº ou Kg
    @ManyToOne
    private UserEntity user;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ApiaryEntity getApiary() {
        return apiary;
    }

    public void setApiary(ApiaryEntity apiary) {
        this.apiary = apiary;
    }

    public HiveEntity getHiveOrig() {
        return hiveOrig;
    }

    public void setHiveOrig(HiveEntity hiveOrig) {
        this.hiveOrig = hiveOrig;
    }

    public List<HiveEntity> getHiveDestList() {
        return hiveDestList;
    }

    public void setHiveDestList(List<HiveEntity> hiveDestList) {
        this.hiveDestList = hiveDestList;
    }

    public LocalDate getHiveSplitDate() {
        return hiveSplitDate;
    }

    public void setHiveSplitDate(LocalDate hiveSplitDate) {
        this.hiveSplitDate = hiveSplitDate;
    }

    public EReproductionQueen getReproductionQueen() {
        return reproductionQueen;
    }

    public void setReproductionQueen(EReproductionQueen reproductionQueen) {
        this.reproductionQueen = reproductionQueen;
    }

    public EReproductionManagement getReproductionManagement() {
        return reproductionManagement;
    }

    public void setReproductionManagement(EReproductionManagement reproductionManagement) {
        this.reproductionManagement = reproductionManagement;
    }

    public EProductionType getProductionType() {
        return productionType;
    }

    public void setProductionType(EProductionType productionType) {
        this.productionType = productionType;
    }

    public Long getQuantitiy() {
        return quantitiy;
    }

    public void setQuantitiy(Long quantitiy) {
        this.quantitiy = quantitiy;
    }

    public EQuantityType getQuantityType() {
        return quantityType;
    }

    public void setQuantityType(EQuantityType quantityType) {
        this.quantityType = quantityType;
    }

    public UserEntity getUser() { return user; }

    public void setUser(UserEntity user) { this.user = user; }
}
