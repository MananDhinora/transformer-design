package com.transformer.design.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.transformer.design.DTO.DefaultValuesDTO;
import com.transformer.design.DTO.UserDTO;
import com.transformer.design.model.BaseDefaultValueData;
import com.transformer.design.model.UserData;
import com.transformer.design.repository.BaseDefaultValueRepository;
import com.transformer.design.repository.DefaultValueRepositoryImpl;
import com.transformer.design.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class AuthService {

  @Autowired private BaseDefaultValueRepository baseDefaultValueRepository;

  @Autowired private DefaultValueRepositoryImpl defaultValueRepositoryImpl;

  private final UserRepository userRepository;

  private final PasswordEncoder passwordEncoder;

  private final AuthenticationManager authenticationManager;

  public AuthService(
      UserRepository userRepository,
      AuthenticationManager authenticationManager,
      PasswordEncoder passwordEncoder) {
    this.authenticationManager = authenticationManager;
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  public UserData signup(UserDTO input) {
    UserData user =
        UserData.builder()
            .email(input.getEmail())
            .password(passwordEncoder.encode(input.getPassword()))
            .username(input.getUsername())
            .build();
    UserData savedUser = userRepository.save(user);

    List<BaseDefaultValueData> allBaseDefaults = baseDefaultValueRepository.findAll();
    for (BaseDefaultValueData baseDefaultValue : allBaseDefaults) {
      DefaultValuesDTO defaultValuesDTO =
          DefaultValuesDTO.builder()
              .userId(savedUser.getId())
              .valueType(baseDefaultValue.getBaseValueType())
              .defaultValues(baseDefaultValue.getDefaultValues())
              .build();
      defaultValueRepositoryImpl.update(defaultValuesDTO);
    }
    // log.info("All base defaults: {}", allBaseDefaults);

    return savedUser;
  }

  public UserData authenticate(UserDTO input) {
    UserData user = userRepository.findByEmail(input.getEmail());
    if (user == null) {
      throw new UsernameNotFoundException("User not found");
    }

    try {
      authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(input.getEmail(), input.getPassword()));
      return user;
    } catch (Exception e) {
      log.error("Error authenticating user {}", input.getEmail(), e);
      throw e;
    }
  }
}
