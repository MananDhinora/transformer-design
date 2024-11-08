package com.transformer.design.model.DefaultValues;

import lombok.Data;

@Data
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
