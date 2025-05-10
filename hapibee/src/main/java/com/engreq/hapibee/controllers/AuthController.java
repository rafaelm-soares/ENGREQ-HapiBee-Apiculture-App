package com.engreq.hapibee.controllers;

import com.engreq.hapibee.dto.ResponseMessageDTO;
import com.engreq.hapibee.security.dto.AuthLoginDTO;
import com.engreq.hapibee.security.dto.AuthRegisterDTO;
import com.engreq.hapibee.security.dto.AuthResponseDTO;
import com.engreq.hapibee.security.dto.ResetPasswordDTO;
import com.engreq.hapibee.service.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;


    @PostMapping("/sign-in")
    public ResponseEntity<AuthResponseDTO> authenticateUser(@RequestBody AuthLoginDTO loginRequest,
                                                            HttpServletResponse response) {
        AuthResponseDTO responseDTO = this.authService.login(loginRequest);
        Cookie cookie = this.authService.createCookie(responseDTO.getToken());
        //response.addCookie(cookie);
        response.addHeader(
                "Set-Cookie",
                cookie.getName() + "=" + cookie.getValue() +
                        "; Path=" + cookie.getPath() +
                        "; Max-Age=" + cookie.getMaxAge() +
                        "; SameSite=None; Secure; HttpOnly=true;");
        responseDTO.setToken(" "); // Clear token in response dto
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(responseDTO);
    }

    @PostMapping("/sign-up")
    public ResponseEntity<ResponseMessageDTO> registerUser(@RequestBody @Valid AuthRegisterDTO register) {
        boolean isRegistered = this.authService.registerUser(register);
        if (isRegistered) {
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(new ResponseMessageDTO("User registered successfully!"));
        }
        return ResponseEntity
                .status(HttpStatus.NOT_ACCEPTABLE)
                .body(new ResponseMessageDTO("Please try again."));
    }

    @GetMapping("/activate-account/{token}")
    public ResponseEntity<ResponseMessageDTO> activateAccount(@PathVariable String token) {
        boolean isActivated = authService.activateAccount(token);
        if (isActivated) {
            return ResponseEntity
                    .status(HttpStatus.ACCEPTED)
                    .body(new ResponseMessageDTO("You account is now active!"));
        }
        return ResponseEntity
                .status(HttpStatus.NOT_ACCEPTABLE)
                .body(new ResponseMessageDTO("Please try again."));
    }

    @PostMapping("/logout")
    public ResponseEntity<ResponseMessageDTO> logout(HttpServletRequest request, HttpServletResponse response) {
        // Invalidate the HTTP session
        request.getSession().invalidate();
        // Invalidate cookie
        Cookie cookie = this.authService.logout();
        response.addHeader(
                "Set-Cookie",
                cookie.getName() + "=" + cookie.getValue() +
                        "; Path=" + cookie.getPath() +
                        "; Max-Age=" + cookie.getMaxAge() +
                        "; SameSite=None; Secure; HttpOnly=true;");
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponseMessageDTO("User logged out!"));
    }

    @DeleteMapping("/delete-account")
    public ResponseEntity<ResponseMessageDTO> deleteAccount(@AuthenticationPrincipal UserDetails userDetails) {
        boolean isDeleted = authService.deleteAccount(userDetails.getUsername());
        if (isDeleted) {
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(new ResponseMessageDTO("Account deleted successfully!"));
        } else {
            return ResponseEntity
                    .status(HttpStatus.NOT_ACCEPTABLE)
                    .body(new ResponseMessageDTO("Please try again."));
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ResponseMessageDTO> forgotPassword(@RequestBody AuthLoginDTO dto) {
        boolean isToReset = authService.forgotPassword(dto.email);
        if (isToReset) {
            return ResponseEntity
                    .status(HttpStatus.ACCEPTED)
                    .body(new ResponseMessageDTO("A reset password email was sent to your email!"));
        }
        return ResponseEntity
                .status(HttpStatus.NOT_ACCEPTABLE)
                .body(new ResponseMessageDTO("Please try again."));
    }

    @PostMapping("/reset-password/{token}")
    public ResponseEntity<ResponseMessageDTO> resetPassword(@RequestBody @Valid ResetPasswordDTO resetPasswordDTO, @PathVariable String token) {
        boolean isChanged = authService.resetPassword(token, resetPasswordDTO);
        if (isChanged) {
            return ResponseEntity
                    .status(HttpStatus.ACCEPTED)
                    .body(new ResponseMessageDTO("Password updated successfully."));
        }
        return ResponseEntity
                .status(HttpStatus.NOT_ACCEPTABLE)
                .body(new ResponseMessageDTO("Please try again."));
    }

}
