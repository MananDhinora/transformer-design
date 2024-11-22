package com.transformer.design.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.transformer.design.model.UserData;

/* Inherited Interface that is used to Access MongoDB */
@Repository
public interface UserRepository extends MongoRepository<UserData, String> {

    UserData findByEmail(String Email);

}
