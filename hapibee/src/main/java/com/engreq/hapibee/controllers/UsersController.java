package com.engreq.hapibee.controllers;

import com.engreq.hapibee.dto.UserDTO;
import com.engreq.hapibee.service.UsersService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/protected")
public class UsersController {

    @Autowired
    private UsersService userService;

    @GetMapping("/get-account")
    public ResponseEntity<UserDTO> getUserAccount(@AuthenticationPrincipal UserDetails userDetails) {
        UserDTO responseDTO = userService.getUserDetails(userDetails);
        return ResponseEntity
                .status(HttpStatus.ACCEPTED)
                .body(responseDTO);
    }

    @PostMapping("/update-account")
    public ResponseEntity<UserDTO> updateUserAccount(@RequestBody @Valid UserDTO updatedDTO,
                                                    @AuthenticationPrincipal UserDetails userDetails) {
        UserDTO responseDTO = userService.updateUserDetails(updatedDTO, userDetails);
        return ResponseEntity
                .status(HttpStatus.ACCEPTED)
                .body(responseDTO);
    }

}
