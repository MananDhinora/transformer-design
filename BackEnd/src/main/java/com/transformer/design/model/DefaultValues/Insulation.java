package com.transformer.design.model.DefaultValues;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Insulation {

    private Float HVConductor;
    private Float HVLayerInsulation;
    private Float LVConductor;
    private Float LVLayerInsulation;
    private Float endBlock;

}
