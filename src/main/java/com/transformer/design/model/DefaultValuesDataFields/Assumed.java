package com.transformer.design.model.DefaultValuesDataFields;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Assumed {

    private Float StackingFactor;

    private Float SpaceFactor;

    private Float CopperDensity;

    private Float AluminumDensity;

    private Float CUSpecificResistance;

    private Float ALSpecificResistance;

    private Float SpecificWeightOil;

}
