package com.transformer.design.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.transformer.design.DTO.DefaultValuesDTO;
import com.transformer.design.service.DefaultValueService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RestController
@RequestMapping("/default")
public class DefaultValueController {

  @Autowired private DefaultValueService defaultValueService;

  /*
   * GET "/default/getValue/{}"
   *
   * Used for fetching defaultValues.
   *
   * if no defaultValue is found it will return the baseDefaultValue of the same type
   *
   * returns DefaultData : ResponseEntity<?>
   */
  @GetMapping("/getValue/{valueType}")
  public ResponseEntity<?> getValue(
      @PathVariable String valueType, @RequestHeader(name = "Authorization") String token) {
    return defaultValueService.getValue(valueType, token);
  }

  @PutMapping("/setValue")
  public ResponseEntity<?> setValue(@RequestBody DefaultValuesDTO defaultValues) {
    return defaultValueService.setValue(defaultValues);
  }
}
