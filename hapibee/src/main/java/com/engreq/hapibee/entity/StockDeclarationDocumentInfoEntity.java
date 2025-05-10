package com.engreq.hapibee.entity;

import com.engreq.hapibee.enums.EApiaryApprovalStatus;
import com.engreq.hapibee.enums.EDeclarationType;
import com.engreq.hapibee.enums.EStockDeclarationInfoEntityStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

/**
 * Declaração existências informação sobre o documento
 */

@Entity
@Table(name = "stockDeclarationDocumentInfo")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StockDeclarationDocumentInfoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long documentNumber;

    private int version;

    @Enumerated(EnumType.STRING)
    private EDeclarationType declarationType;

    private String year;

    private String officialBeekeeperId;

    /*
    private String state;
     */

    //private Date submissionDate;

    @Enumerated(EnumType.STRING)
    private EStockDeclarationInfoEntityStatus isApproved;


    @Column(updatable = false, nullable = false)
    @CreationTimestamp
    @EqualsAndHashCode.Exclude
    private LocalDateTime submissionDate;


    /*private boolean desm;*/

    private String unidadeOrganica;

    //private Date declarationDate;

    /*
    @Column(updatable = false, nullable = false)
    @CreationTimestamp
    @EqualsAndHashCode.Exclude
    private LocalDateTime declarationDate;
    */

    public Long getDocumentNumber() {return documentNumber;}

    public EDeclarationType getDeclarationType() {return declarationType;}

    public int getVersion() {return version;}

    public LocalDateTime getSubmissionDate() {return submissionDate;}

    public String getOfficialBeekeeperId() {return officialBeekeeperId;}

    public String getUnidadeOrganica() {return unidadeOrganica;}

    public String getYear() {return year;}

    /*
    @OneToOne
    @JoinColumn(name = "user_id")
    public UserEntity user;

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }
     */

    public void setDeclarationType(EDeclarationType declarationType) {this.declarationType = declarationType;}

    public void setDocumentNumber(Long documentNumber) {this.documentNumber = documentNumber;}

    public void setOfficialBeekeeperId(String officialBeekeeperId) {this.officialBeekeeperId = officialBeekeeperId;}

    public void setSubmissionDate(LocalDateTime submissionDate) {this.submissionDate = submissionDate;}

    public void setUnidadeOrganica(String unidadeOrganica) {this.unidadeOrganica = unidadeOrganica;}

    public void setVersion(int version) {this.version = version;}

    public void setYear(String year) {this.year = year;}

    public EStockDeclarationInfoEntityStatus getIsApproved() {
        return isApproved;
    }

    public void setIsApproved(EStockDeclarationInfoEntityStatus isApproved) {
        this.isApproved = isApproved;
    }
}