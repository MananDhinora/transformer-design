package com.transformer.design.repository;

import com.transformer.design.DTO.DefaultValuesDTO;
import com.transformer.design.model.DefaultValueData;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

public class DefaultValueRepositoryImpl {

    private static final Logger log = LoggerFactory.getLogger(DefaultValueRepositoryImpl.class);

    @Autowired
    MongoTemplate mongoTemplate;

    public DefaultValueData update(DefaultValuesDTO input) {
        try {
            Query query = new Query()
                .addCriteria(Criteria.where("userId").is(input.getUserId()).and("valueType").is(input.getValueType()));
            Update updateDefinition = new Update().set("defaultValues", input.getDefaultValues());
            FindAndModifyOptions options = FindAndModifyOptions.options().returnNew(true).upsert(true);
            return mongoTemplate.findAndModify(query, updateDefinition, options, DefaultValueData.class);
        }
        catch (Exception e) {
            log.atError().log("error executing query for user {}", input.getUserId(), e);
        }
        return null;
    }

    public DefaultValueData findDefaultValueDocument(String userId, String valueType) {
        Query query = new Query();
        query.addCriteria(Criteria.where("userId").is(userId).and("valueType").is(valueType));
        return mongoTemplate.find(query, DefaultValueData.class).getFirst();
    }

}