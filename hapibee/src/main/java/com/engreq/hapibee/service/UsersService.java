package com.engreq.hapibee.service;

import com.engreq.hapibee.dto.UserDTO;
import org.springframework.security.core.userdetails.UserDetails;

public interface UsersService {

    UserDTO getUserDetails(UserDetails user);

    UserDTO updateUserDetails(UserDTO updatedUser, UserDetails user);

}
