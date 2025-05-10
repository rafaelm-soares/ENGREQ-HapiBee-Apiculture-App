package com.engreq.hapibee.security.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class AuthResponseDTO {

    private final String name;
    private final String email;
    private String token;
    private final List<String> role;

}
