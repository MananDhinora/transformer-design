package com.transformer.design.repository;

import com.transformer.design.model.DefaultValueData;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface DefaultValueRepository extends MongoRepository<DefaultValueData, String> {

    List<DefaultValueData> findByUserId(String userId);

    List<DefaultValueData> findByValueType(String type);

}
