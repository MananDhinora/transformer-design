package com.transformer.design.repository;

import com.transformer.design.model.DefaultValuesData;
import com.transformer.design.model.UserData;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DefaultValuesRepository extends MongoRepository<DefaultValuesData, String> {

    UserData findByDesignType(String designType);

}
