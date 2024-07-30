package com.transformer.design.model;

import com.transformer.design.model.DefaultValues.DefaultValues;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(value = "DefaultValueData")
public class DefaultValueData {
    @Id
    private String id;

    private String valueType;

    private String user_id;

    private DefaultValues defaultValues;

}
