package com.engreq.hapibee.entity;

import com.engreq.hapibee.enums.EApiaryApprovalStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "transfer")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class TransferEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate transferDate;

    @ManyToOne
    private ApiaryEntity apiary;

    @Enumerated(EnumType.STRING)
    private EApiaryApprovalStatus dgavStatus;

    @Enumerated(EnumType.STRING)
    private EApiaryApprovalStatus controledZonesStatus;

    @Enumerated(EnumType.STRING)
    private EApiaryApprovalStatus transferStatus;

    @ManyToOne
    private LocationEntity location;

    @ManyToOne
    private UserEntity user;

}
