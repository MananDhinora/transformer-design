package com.transformer.design.DTO;

import com.transformer.design.model.DefaultValues.DefaultValues;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DefaultValuesDTO {

    private String user_id;

    private String baseValueType;

    private DefaultValues defaultValues;

}