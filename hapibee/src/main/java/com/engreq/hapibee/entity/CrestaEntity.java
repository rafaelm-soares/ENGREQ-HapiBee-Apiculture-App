package com.engreq.hapibee.entity;

import com.engreq.hapibee.enums.EBeeRole;
import com.engreq.hapibee.enums.EProductType;
import com.engreq.hapibee.enums.EQuantityType;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * Cresta
 */
@Entity
@Table(name = "crest")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CrestaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private ApiaryEntity apiary;    //apiário

    @ManyToOne
    private HiveEntity hive;    //colmeia

    private Long nrOfBoards;         //Alça

    @Enumerated(EnumType.STRING)
    private EProductType ProductType; // Tipo de Produtp

    public Long quantity;  // Quantidade

    @ManyToOne
    private UserEntity user;

    @Enumerated(EnumType.STRING)
    private EQuantityType quantityType; // Nº ou Kg


    private LocalDate CrestaDate; //Data da cresta

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

    public HiveEntity getHive() {
        return hive;
    }

    public void setHive(HiveEntity hive) {
        this.hive = hive;
    }

    public Long getNrOfBoards() {
        return nrOfBoards;
    }

    public void setNrOfBoards(Long nrOfBoards) {
        this.nrOfBoards = nrOfBoards;
    }

    public EProductType getProductType() {
        return ProductType;
    }

    public void setProductType(EProductType productType) {
        ProductType = productType;
    }

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    public EQuantityType getQuantityType() {
        return quantityType;
    }

    public void setQuantityType(EQuantityType quantityType) {
        this.quantityType = quantityType;
    }

    public LocalDate getCrestaDate() {
        return CrestaDate;
    }

    public void setCrestaDate(LocalDate crestaDate) {
        CrestaDate = crestaDate;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }
}