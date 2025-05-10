package com.engreq.hapibee.service;

import com.engreq.hapibee.dto.UserDTO;
import com.engreq.hapibee.entity.UserEntity;
import com.engreq.hapibee.mappers.UserMapper;
import com.engreq.hapibee.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class UsersServiceImpl implements UsersService {

    @Autowired
    private UserRepository userRepository;


    @Override
    public UserDTO getUserDetails(UserDetails userDetails) {
        // Cast UserDetails to UserEntity
        UserEntity user = (UserEntity) userDetails;
        Optional<UserEntity> found = userRepository.findById(user.getId());
        if (found.isEmpty()) {
            throw new IllegalArgumentException("Error: invalid user!");
        }
        UserEntity result = found.get();
        return UserMapper.convertToDTO(result);
    }

    @Override
    public UserDTO updateUserDetails(UserDTO dto, UserDetails userDetails) {
        // Cast UserDetails to UserEntity
        UserEntity user = (UserEntity) userDetails;
        Optional<UserEntity> found = userRepository.findById(user.getId());
        if (found.isEmpty()) {
            throw new IllegalArgumentException("Error: invalid user!");
        } else if (!found.get().getId().equals(dto.id)) {
            // Verify that the user to update is the same user who made the request
            throw new IllegalArgumentException("Error: invalid user!");
        }
        UserEntity userToUpdate = found.get();
        userToUpdate.setFirstName(dto.firstName);
        userToUpdate.setLastName(dto.lastName);
        userToUpdate.setEmail(dto.email);
        userToUpdate.setPhoneNumber(dto.phoneNumber);
        userToUpdate.setAddress(dto.address);
        userToUpdate.setPostalNumber(dto.postalNumber);
        userToUpdate.setPostal(dto.postal);
        // Save updated user
        UserEntity result = userRepository.save(userToUpdate);
        return UserMapper.convertToDTO(result);
    }

}
