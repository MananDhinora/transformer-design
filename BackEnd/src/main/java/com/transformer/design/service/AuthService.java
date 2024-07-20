package com.transformer.design.service;

import com.transformer.design.DTO.UserDTO;
import com.transformer.design.model.UserData;
import com.transformer.design.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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
            .build();
        return userRepository.save(user);
    }

    public UserData authenticate(UserDTO input) {
        try {
            authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(input.getEmail(), input.getPassword()));
        }
        catch (InternalAuthenticationServiceException e) {
            log.atError().log("No user named {} found", input.getEmail());
        }
        try {
            return userRepository.findByEmail(input.getEmail());
        }
        catch (Exception e) {
            log.atError().log("Error while authenticating {}", input.getEmail(), e);
        }
        return null;
    }

}
