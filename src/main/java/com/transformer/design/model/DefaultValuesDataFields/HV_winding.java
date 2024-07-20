package com.transformer.design.model.DefaultValuesDataFields;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class HV_winding {

    private Float HT_MaximumConductorDiameterLimit;

    private Float HT_MaximumStripThicknessLimit;

    private Float HT_TurnRoundUp;

    private Float HT_MinimumStripStartThicknessCu;

    private Float HT_Connection;

    private Float HV_RingThickness;

    private Float AmountOfCoilSpacer; // per coil

    private Float HV_SpacerWidth;

    private Float HV_CoilSpacerThickness;

}
