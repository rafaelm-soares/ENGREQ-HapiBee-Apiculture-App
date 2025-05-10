package com.engreq.hapibee.entity;

import com.engreq.hapibee.enums.EDiseaseType;
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
 * DOENCA/TRATAMENTO
 */
@Entity
@Table(name = "disease")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DiseaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private HiveEntity hive;

    private LocalDate date;

    @Enumerated(EnumType.STRING)
    public EDiseaseType type;

    public String disease;

    public String medication;

    public String activeSubstance;

    public String dose;

    public String duration;

    public LocalDate endDate;

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

    public EDiseaseType getType() {
        return type;
    }

    public void setType(EDiseaseType type) {
        this.type = type;
    }

    public String getDisease() {
        return disease;
    }

    public void setDisease(String disease) {
        this.disease = disease;
    }

    public String getMedication() {
        return medication;
    }

    public void setMedication(String medication) {
        this.medication = medication;
    }

    public String getActiveSubstance() {
        return activeSubstance;
    }

    public void setActiveSubstance(String activeSubstance) {
        this.activeSubstance = activeSubstance;
    }

    public String getDose() {
        return dose;
    }

    public void setDose(String dose) {
        this.dose = dose;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
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
