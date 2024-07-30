package com.transformer.design.controller;

import com.transformer.design.model.BaseDefaultValueData;
import com.transformer.design.repository.BaseDefaultValueRepository;
import com.transformer.design.service.BaseDefaultValueService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Slf4j
@Controller
@RequestMapping("/default")
public class BaseDefaultValueController {

    @Autowired
    private BaseDefaultValueService baseDefaultValueService;

    @GetMapping("/baseValue/{valueType}")
    public ResponseEntity<?> getBaseValue(@PathVariable String valueType){
        return baseDefaultValueService.getBaseValue(valueType);
    }
}
