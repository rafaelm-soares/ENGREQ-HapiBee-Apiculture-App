package com.engreq.hapibee.service;

import com.engreq.hapibee.security.dto.AuthLoginDTO;
import com.engreq.hapibee.security.dto.AuthRegisterDTO;
import com.engreq.hapibee.security.dto.AuthResponseDTO;
import com.engreq.hapibee.security.dto.ResetPasswordDTO;
import jakarta.servlet.http.Cookie;

public interface AuthService {

    AuthResponseDTO login(AuthLoginDTO loginRequest);

    boolean registerUser(AuthRegisterDTO registerDTO);

    boolean activateAccount(String token);

    boolean deleteAccount(String email);

    Cookie createCookie(String jwtToken);

    Cookie logout();

    boolean forgotPassword(String email);

    boolean resetPassword(String verifyToken, ResetPasswordDTO resetPasswordDTO);

}