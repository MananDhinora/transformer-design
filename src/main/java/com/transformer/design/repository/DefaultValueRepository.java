package com.transformer.design.repository;

import com.transformer.design.model.DefaultValueData;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DefaultValueRepository extends MongoRepository<DefaultValueData, String> {

    DefaultValueData findByUserId(String userId);

}
