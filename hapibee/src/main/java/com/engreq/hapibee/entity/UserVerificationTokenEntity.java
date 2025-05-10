package com.engreq.hapibee.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * User verification entity to store verification tokens after registration.
 * Token will be active for 24h
 * <a href="https://www.baeldung.com/registration-verify-user-by-email">...</a>
 * <a href="https://dzone.com/articles/creating-account-activation-links-with-vaadin">...</a>
 */

@Entity
@Table(name = "user_verification")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserVerificationTokenEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String token;

    @OneToOne(targetEntity = UserEntity.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "user_id")
    private UserEntity user;

    private LocalDateTime createdDate;

    private LocalDateTime expiryDate;

    /**
     * Getters & Setters
     */

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public LocalDateTime getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(LocalDateTime expiryDate) {
        this.expiryDate = expiryDate;
    }

}
