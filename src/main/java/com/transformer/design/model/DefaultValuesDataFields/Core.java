package com.transformer.design.model.DefaultValuesDataFields;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Core {

    private Float CommonBlockThickness;

    private Float MSPressurePlateThickness;

    private Float CommonRingThickness;

    private Float CoreDiameter;

    private Float WindowFactor;

    private Float RatioWindow; // Height/width

    private Float CoreLossHandlingFactor; // A/c

    private Float CoreDensity; // gm/cc

    private Float HVToYokeClearance;

    private Float HVDiscSpacerThickness;

    private Float PhaseToPhaseClearance;

    private Float LVToHVClearance;

    private Float LVToYokeClearance;

    private Float CoreToLVClearance;

}
