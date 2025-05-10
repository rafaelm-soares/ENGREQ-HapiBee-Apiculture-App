package com.engreq.hapibee.entity;

import com.engreq.hapibee.enums.EHiveSuperType;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

/**
 * NINHO/MELGUEIRA
 * número de quadros
 */
@Entity
@Table(name = "hive_super")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HiveSuperEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private EHiveSuperType type;

    @Max(9)
    private Integer numberOfBoards;


    /**
     * Getters & Setters
     **/

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public EHiveSuperType getType() {
        return type;
    }

    public void setType(EHiveSuperType type) {
        this.type = type;
    }

    public Integer getNumberOfBoards() {
        return numberOfBoards;
    }

    public void setNumberOfBoards(Integer numberOfBoards) {
        this.numberOfBoards = numberOfBoards;
    }

}
