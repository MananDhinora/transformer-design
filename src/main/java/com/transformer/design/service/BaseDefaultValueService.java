package com.transformer.design.service;

import com.transformer.design.model.BaseDefaultValueData;
import com.transformer.design.repository.BaseDefaultValueRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class BaseDefaultValueService {

    @Autowired
    private BaseDefaultValueRepository baseDefaultValueRepository;

    /*
     * This method returns the BaseDefaultValue document's DefaultValues
     */
    public ResponseEntity<?> getBaseValue(String valueType) {
        try {
            BaseDefaultValueData baseValue = baseDefaultValueRepository.findByBaseValueType(valueType);
            if (baseValue == null) {
                log.atInfo().log("the base value \"{}\" is not in the database", valueType);
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            log.atInfo().log("loading the default value: {}", baseValue.getBaseValueType());
            return new ResponseEntity<>(baseValue.getDefaultValues(), HttpStatus.OK);
        }
        catch (Exception e) {
            log.atError().log("error while loading baseValues:", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
