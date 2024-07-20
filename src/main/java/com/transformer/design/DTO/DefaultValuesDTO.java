package com.transformer.design.DTO;

import com.transformer.design.model.DefaultValuesDataFields.*;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DefaultValuesDTO {

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
