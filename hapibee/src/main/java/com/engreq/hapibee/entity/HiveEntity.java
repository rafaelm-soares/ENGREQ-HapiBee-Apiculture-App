package com.engreq.hapibee.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * COLMEIA
 */
@Entity
@Table(name = "hive")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HiveEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @OneToMany
    private List<HiveSuperEntity> hiveSuperList;
    @ManyToOne
    private ApiaryEntity apiary;


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

    public List<HiveSuperEntity> getHiveSuperList() {
        return hiveSuperList;
    }

    public void setHiveSuperList(List<HiveSuperEntity> hiveSuperList) {
        this.hiveSuperList = hiveSuperList;
    }

    public ApiaryEntity getApiary() {
        return apiary;
    }

    public void setApiary(ApiaryEntity apiary) {
        this.apiary = apiary;
    }

}
