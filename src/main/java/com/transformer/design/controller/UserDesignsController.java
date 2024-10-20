package com.transformer.design.controller;

import com.transformer.design.service.UserDesignService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/design")
public class UserDesignsController {

    @Autowired
    private UserDesignService userDesignService;

}