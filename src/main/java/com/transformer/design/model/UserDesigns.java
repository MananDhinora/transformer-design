package com.transformer.design.model;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Builder
@Data
@Document(value = "DefaultValueData")
public class UserDesigns {

    @Id
    private String id;

}
