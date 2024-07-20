package com.transformer.design.model.DefaultValuesDataFields;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Performance {

    private Float MaximumPermissibleAmbientTemperature;

    private Float RelevantWindingTemperature;

    private Float PermissibleAxialForces;

    private Float PermissibleRadialForces;

    private Float Magnetization;

}
