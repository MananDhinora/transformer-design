package com.transformer.design.controller;

import com.transformer.design.service.DefaultValuesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DefaultValuesController {

    @Autowired
    private DefaultValuesService defaultValuesService;

}
