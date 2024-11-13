package com.transformer.design.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.transformer.design.DTO.UserDTO;
import com.transformer.design.model.UserData;
import com.transformer.design.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class AuthService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository userRepository, AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserData signup(UserDTO input) {
        UserData user = UserData.builder()
                .email(input.getEmail())
                .password(passwordEncoder.encode(input.getPassword()))
                .username(input.getUsername())
                .build();
        return userRepository.save(user);
    }

    public UserData authenticate(UserDTO input) {
        UserData user = userRepository.findByEmail(input.getEmail());
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(input.getEmail(), input.getPassword())
            );
            return user;
        } catch (Exception e) {
            log.error("Error authenticating user {}", input.getEmail(), e);
            throw e;
        }
    }

}
