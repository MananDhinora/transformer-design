package com.transformer.design.model.DefaultValuesDataFields;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Value {

    private Float CuPerAlQuantityLowIfLessThan;

    private Float CuPerAlQuantityHighIfMoreThan;

    private Float EddyCurrentLoss;

    private Float StrayLoss;

    private Float InsulationPaperWeightOfConductorWeight;

    private Float AT_AcceptableDifference;

    private Float WeightActivePartsOfCoreAndWindings;

    private Float DensityOfActiveParts;

    private Float CuPerAlStripRoundingFactor;

}
