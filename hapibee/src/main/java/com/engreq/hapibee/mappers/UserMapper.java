package com.engreq.hapibee.mappers;

import com.engreq.hapibee.dto.UserDTO;
import com.engreq.hapibee.entity.UserEntity;

public class UserMapper {

    public static UserDTO convertToDTO(UserEntity user) {
        UserDTO dto = new UserDTO();
        dto.id = user.getId();
        dto.firstName = user.getFirstName();
        dto.lastName = user.getLastName();
        dto.email = user.getEmail();
        dto.phoneNumber = user.getPhoneNumber();
        dto.address = user.getAddress();
        dto.postalNumber = user.getPostalNumber();
        dto.postal = user.getPostal();
        return dto;
    }

}
