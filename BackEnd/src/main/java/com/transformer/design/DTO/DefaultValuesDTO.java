package com.transformer.design.DTO;

import com.transformer.design.model.DefaultValues.DefaultValues;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DefaultValuesDTO {

    private String id;

    private String userId;

    private String valueType;

    private DefaultValues defaultValues;

}