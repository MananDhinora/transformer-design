package com.transformer.design.repository;

import com.transformer.design.model.UserData;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/* Inherited Interface that is used to Access MongoDB */
@Repository
public interface UserRepository extends MongoRepository<UserData, String> {

    UserData findByEmail(String Email);

}
