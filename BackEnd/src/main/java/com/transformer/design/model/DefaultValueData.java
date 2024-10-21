package com.transformer.design.model;

import com.transformer.design.model.DefaultValues.DefaultValues;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Builder
@Data
@Document(value = "DefaultValueData")
public class DefaultValueData {

    @Id
    private String id;

    private String valueType;

    private String userId;

    private DefaultValues defaultValues;

}
