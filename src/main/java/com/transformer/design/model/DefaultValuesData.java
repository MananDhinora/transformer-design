package com.transformer.design.model;

import com.transformer.design.model.DefaultValuesDataFields.*;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(value = "DefaultValues")
@Data
@Builder
public class DefaultValuesData {

    @Id
    private String id;

    private String userId;

    private String DesignType;

    private Assumed assumed;

    private LV_winding LVwelding;

    private HV_winding HVwinding;

    private Core core;

    private Value value;

    private Tank tank;

    private Performance performance;

    private MaterialCost materialCost;

}