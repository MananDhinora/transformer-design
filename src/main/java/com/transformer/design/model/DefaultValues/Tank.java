package com.transformer.design.model.DefaultValues;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Tank {

    private Float OilQuantity;

    private Float SurfaceLossDissipation;

    private Float WallSheetThickness;

    private Float TopCoverSheetThickness;

    private Float BottomSheetThickness;

    private Float WindingToWallAndClearance;

    private Float AmountOfConservatorBelowKVA;

}
