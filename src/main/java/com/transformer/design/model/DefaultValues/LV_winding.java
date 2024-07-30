package com.transformer.design.model.DefaultValues;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LV_winding {

    private Float LT_MaximumStripThicknessLimit;

    private Float LT_MaximumStripCrossSectionLimit;

    private Float LT_MinimumStartThicknessCu;

    private Float LT_MinimumStartThicknessAl;

    private Float LT_MaximumStripWidth;

    private Float LT_TurnRoundUp;

    private Float LV_AmountOfTranspositions;

    private Float LV_EvenTurns;

    private Float LV_RingThickness;

}
