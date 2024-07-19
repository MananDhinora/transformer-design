package com.transformer.design.repository;

import com.transformer.design.model.UserData;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends MongoRepository<UserData, String> {
    public UserData findByEmail(String Email);
}
