package com.transformer.design.model.DefaultValuesDataFields;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MaterialCost {

    private Float Copper;

    private Float Aluminum;

    private Float Core;

    private Float Oil;

    private Float InsulatingPaper;

    private Float MS;

    private Float Hardware;

    private Float B_Relay;

    private Float WTI;

    private Float Dial_OTI;

    private Float RadiatorValve;

    private Float TapSwitch;

    private Float Breather;

    private Float CableBoxHV;

    private Float CableBoxLV;

    private Float MagneticOilGauge;

    private Float MarshallingBox;

    private Float HV_Bushings;

    private Float LV_Bushings;

    private Float CorkGasket;

}
