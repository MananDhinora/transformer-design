package com.transformer.design.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

import com.transformer.design.DTO.DefaultValuesDTO;
import com.transformer.design.model.DefaultValueData;
import com.transformer.design.model.UserData;
import com.transformer.design.repository.BaseDefaultValueRepository;
import com.transformer.design.repository.DefaultValueRepository;
import com.transformer.design.repository.DefaultValueRepositoryImpl;
import com.transformer.design.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class DefaultValueService {

  @Autowired private JwtService jwtService;

  @Autowired private UserRepository userRepository;

  @Autowired private DefaultValueRepository defaultValueRepository;

  @Autowired private BaseDefaultValueRepository baseDefaultValueRepository;

  @Autowired private BaseDefaultValueService baseDefaultValueService;

  @Autowired private DefaultValueRepositoryImpl defaultValueRepositoryImpl;

  @Autowired private MongoTemplate mongoTemplate;

  /*
   * New method to fetch values for the page where we set default data it checks if the
   * user has a defaultValue already set for that valueType then returns those values,
   * else returns the baseDefaultValues
   */
  public ResponseEntity<?> getValue(
      @PathVariable String valueType, @RequestHeader(name = "Authorization") String token) {
    String jwt = token.substring(7);
    String userEmail = jwtService.extractEmail(jwt);
    UserData userDocument = userRepository.findByEmail(userEmail);
    try {
      List<DefaultValueData> defaultValueDocument =
          defaultValueRepository.findByUserId(userDocument.getId());
      if (defaultValueDocument != null) {
        return new ResponseEntity<>(defaultValueDocument, HttpStatus.OK);
      }
      log.atInfo().log(
          "no defaultValues for user: {} found \n returning BaseDefaultValue.", userEmail);
      return new ResponseEntity<>(baseDefaultValueService.getBaseValue(valueType), HttpStatus.OK);
    } catch (Exception e) {
      log.atError().log("error occurred when fetching defaultValues for user {}:", userEmail, e);
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public ResponseEntity<?> setValue(DefaultValuesDTO defaultValues) {
    try {
      defaultValueRepositoryImpl.update(defaultValues);
      return new ResponseEntity<>(Map.of("message", "defaultValue is updated"), HttpStatus.OK);
    } catch (Exception e) {
      log.atError().log("error:", e);
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
