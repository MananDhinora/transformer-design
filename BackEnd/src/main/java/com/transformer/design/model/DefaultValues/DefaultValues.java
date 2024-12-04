package com.transformer.design.model.DefaultValues;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DefaultValues {

    private Assumed assumed;

    private LV_winding LVwelding;

    private HV_winding HVwinding;

    private Core core;

    private Value value;

    private Tank tank;

    private Performance performance;

    private MaterialCost materialCost;

    private Clearance clearance;

    private Insulation insulation;

}
