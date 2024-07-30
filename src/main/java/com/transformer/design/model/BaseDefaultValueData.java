package com.transformer.design.model;

import com.transformer.design.model.DefaultValues.DefaultValues;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(value = "BaseDefaultValue")
@AllArgsConstructor
@NoArgsConstructor
public class BaseDefaultValueData {
    @Id
    private String id;

    private String  baseValueType;

    private DefaultValues defaultValues;
}
