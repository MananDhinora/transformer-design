package com.transformer.design.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;

public class BaseDefaultValueRepositoryImpl {

    @Autowired
    private MongoTemplate mongoTemplate;

}
