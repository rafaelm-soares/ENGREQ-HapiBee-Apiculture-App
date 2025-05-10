package com.engreq.hapibee.entity;

import com.engreq.hapibee.enums.EApiaryApprovalStatus;
import com.engreq.hapibee.enums.EProductionGoal;
import com.engreq.hapibee.enums.EProductionType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

/**
 * APIÁRIO
 */
@Entity
@Table(name = "apiary")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApiaryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Integer numberOfHives;

    @Enumerated(EnumType.STRING)
    private EProductionGoal productionGoal;

    @Enumerated(EnumType.STRING)
    private EProductionType productionType;

    @ManyToOne
    private LocationEntity location;

    private String vegetation;

    private String observations;

    @Column(updatable = false, nullable = false)
    @CreationTimestamp
    @EqualsAndHashCode.Exclude
    private LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    private EApiaryApprovalStatus isApproved;

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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getNumberOfHives() {
        return numberOfHives;
    }

    public void setNumberOfHives(Integer numberOfHives) {
        this.numberOfHives = numberOfHives;
    }

    public EProductionGoal getProductionGoal() {
        return productionGoal;
    }

    public void setProductionGoal(EProductionGoal productionGoal) {
        this.productionGoal = productionGoal;
    }

    public EProductionType getProductionType() {
        return productionType;
    }

    public void setProductionType(EProductionType productionType) {
        this.productionType = productionType;
    }

    public LocationEntity getLocation() {
        return location;
    }

    public void setLocation(LocationEntity location) {
        this.location = location;
    }

    public String getVegetation() {
        return vegetation;
    }

    public void setVegetation(String vegetation) {
        this.vegetation = vegetation;
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

    public EApiaryApprovalStatus getIsApproved() {
        return isApproved;
    }

    public void setIsApproved(EApiaryApprovalStatus isApproved) {
        this.isApproved = isApproved;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

}
