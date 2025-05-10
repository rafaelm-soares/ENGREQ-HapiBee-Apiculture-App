package com.engreq.hapibee.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

/**
 * APICULTOR
 */
@Entity
@Table(name = "beekeeper")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BeekeeperEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private UserEntity user;

    private String officialId;

    private String address;

    private int phoneNumber;

    private int Nif;


    /**
     * Getters & Setters
     **/

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public String getOfficialId() {
        return officialId;
    }

    public void setOfficialId(String officialId) {
        this.officialId = officialId;
    }

    public String getAddress() {return address;}

    public void setAddress(String address) {this.address = address;}

    public int getPhoneNumber() {return phoneNumber;}

    public void setPhoneNumber(int phoneNumber) {this.phoneNumber = phoneNumber;}

    public int getNif() {return Nif;}

    public void setNif(int nif) {Nif = nif;}
}
