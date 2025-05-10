package com.engreq.hapibee.entity;

import com.engreq.hapibee.enums.EDisinfectionMode;
import com.engreq.hapibee.enums.EDisinfectionMotive;
import com.engreq.hapibee.enums.EMaintenanceMotive;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Caderno de campo
 * INSPEÇÃO/MANUTENÇÃO
 */
@Entity
@Table(name = "maintenance")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MaintenanceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private HiveEntity hive;

    private LocalDate date;

    private String temperature;

    private String humidity;

    @Enumerated(EnumType.STRING)
    private EMaintenanceMotive inspectionType;

    @Enumerated(EnumType.STRING)
    private EDisinfectionMotive motive;

    @Enumerated(EnumType.STRING)
    private EDisinfectionMode disinfectionMode;

    private String productsUsed;

    private String observations;

    @Column(updatable = false, nullable = false)
    @CreationTimestamp
    @EqualsAndHashCode.Exclude
    private LocalDateTime createdAt;

    @ManyToOne
    private UserEntity user;


    /**
     * Getters & Setters
     **/

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public HiveEntity getHive() {
        return hive;
    }

    public void setHive(HiveEntity hive) {
        this.hive = hive;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getTemperature() {
        return temperature;
    }

    public void setTemperature(String temperature) {
        this.temperature = temperature;
    }

    public String getHumidity() {
        return humidity;
    }

    public void setHumidity(String humidity) {
        this.humidity = humidity;
    }

    public EMaintenanceMotive getInspectionType() {
        return inspectionType;
    }

    public void setInspectionType(EMaintenanceMotive inspectionType) {
        this.inspectionType = inspectionType;
    }

    public EDisinfectionMotive getMotive() {
        return motive;
    }

    public void setMotive(EDisinfectionMotive motive) {
        this.motive = motive;
    }

    public EDisinfectionMode getDisinfectionMode() {
        return disinfectionMode;
    }

    public void setDisinfectionMode(EDisinfectionMode disinfectionMode) {
        this.disinfectionMode = disinfectionMode;
    }

    public String getProductsUsed() {
        return productsUsed;
    }

    public void setProductsUsed(String productsUsed) {
        this.productsUsed = productsUsed;
    }

    public String getObservations() {
        return observations;
    }

    public void setObservations(String observations) {
        this.observations = observations;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

}
