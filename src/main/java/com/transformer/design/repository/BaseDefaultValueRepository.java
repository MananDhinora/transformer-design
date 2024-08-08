package com.transformer.design.repository;

import com.transformer.design.model.BaseDefaultValueData;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BaseDefaultValueRepository extends MongoRepository<BaseDefaultValueData, String> {

    BaseDefaultValueData findByBaseValueType(String valueType);

}
