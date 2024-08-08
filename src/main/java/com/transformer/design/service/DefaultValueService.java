package com.transformer.design.service;

import com.transformer.design.model.DefaultValueData;
import com.transformer.design.model.UserData;
import com.transformer.design.repository.DefaultValueRepository;
import com.transformer.design.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

@Slf4j
@Service
public class DefaultValueService {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DefaultValueRepository defaultValueRepository;

    @Autowired
    private BaseDefaultValueService baseDefaultValueService;

    /*
     * New method to fetch values for the page where we set default data it checks if the
     * user has a defaultValue already set for that valueType then returns those values,
     * else returns the baseDefaultValues
     */
    public ResponseEntity<?> getValue(@PathVariable String valueType,
            @RequestHeader(name = "Authorization") String token) {
        String jwt = token.substring(7);
        String userEmail = jwtService.extractEmail(jwt);
        UserData userDocument = userRepository.findByEmail(userEmail);
        try {
            DefaultValueData defaultValueDocument = defaultValueRepository.findByUserId(userDocument.getId());
            if (defaultValueDocument != null) {
                return new ResponseEntity<>(defaultValueDocument, HttpStatus.OK);
            }
            log.atInfo().log("no defaultValues for user: {} found \n returning BaseDefaultValue.", userEmail);
            return new ResponseEntity<>(baseDefaultValueService.getBaseValue(valueType), HttpStatus.OK);
        }
        catch (Exception e) {
            log.atError().log("error:", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}