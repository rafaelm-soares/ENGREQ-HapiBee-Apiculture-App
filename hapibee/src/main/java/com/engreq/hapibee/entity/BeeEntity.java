package com.engreq.hapibee.entity;

import com.engreq.hapibee.enums.EBeeRole;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

/**
 * ABELHA
 */
@Entity
@Table(name = "bee")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BeeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String species;

    private EBeeRole role;

    @ManyToOne
    private HiveEntity hive;


    /**
     * Getters & Setters
     **/

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSpecies() {
        return species;
    }

    public void setSpecies(String species) {
        this.species = species;
    }

    public EBeeRole getRole() {
        return role;
    }

    public void setRole(EBeeRole role) {
        this.role = role;
    }

    public HiveEntity getHive() {
        return hive;
    }

    public void setHive(HiveEntity hive) {
        this.hive = hive;
    }

}
