package com.engreq.hapibee.entity;

import com.engreq.hapibee.enums.EOrigin;
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
 * ALIMENTAÇÃO
 */
@Entity
@Table(name = "feeding")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FeedingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private HiveEntity hive;

    private LocalDate date;

    public String product;

    public String formula;

    @Enumerated(EnumType.STRING)
    public EOrigin origin;

    public String dose;

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

    public String getProduct() {
        return product;
    }

    public void setProduct(String product) {
        this.product = product;
    }

    public String getFormula() {
        return formula;
    }

    public void setFormula(String formula) {
        this.formula = formula;
    }

    public EOrigin getOrigin() {
        return origin;
    }

    public void setOrigin(EOrigin origin) {
        this.origin = origin;
    }

    public String getDose() {
        return dose;
    }

    public void setDose(String dose) {
        this.dose = dose;
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
