package com.transformer.design.DTO;

import com.transformer.design.model.CoolingType;
import com.transformer.design.model.Phase;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDesignsDTO {

    private String id;

    private String userId;

    private String designName;

    private CoolingType coolingType;

    private Float transformerRating;

    private Float HV_Voltage;

    private Float LV_Voltage;

    private Phase phase;

    private Float positiveTap;

    private Float negativeTap;

    private Float tapDifference;

    private Float impedance;

    private Integer noLoadLoss;

    private Integer shortCircuitLoad;

    private Float empiricalK;

}
