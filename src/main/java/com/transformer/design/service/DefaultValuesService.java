package com.transformer.design.service;

import com.transformer.design.repository.DefaultValuesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DefaultValuesService {

    @Autowired
    private DefaultValuesRepository defaultValuesRepository;

}
