package com.transformer.design;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@Slf4j
public class TransformerDesignApplication {

  public static void main(String[] args) {
    SpringApplication.run(TransformerDesignApplication.class, args);
  }

  // Uncomment this to insert Demo Default data in db on application startup only do this once
  //   @Bean
  //   CommandLineRunner initializeDefaultValues(
  //       DefaultValueRepository defaultValueRepository,
  //       BaseDefaultValueRepository baseDefaultValueRepository) {
  //     return args -> {
  //       DefaultValues demoValues =
  //           DefaultValues.builder()
  //               .assumed(
  //                   Assumed.builder()
  //                       .StackingFactor(0.97f)
  //                       .SpaceFactor(0.97f)
  //                       .CopperDensity(8.9f)
  //                       .AluminumDensity(2.7f)
  //                       .CUSpecificResistance(0.017241f)
  //                       .ALSpecificResistance(0.028264f)
  //                       .SpecificWeightOil(0.89f)
  //                       .build())
  //               .core(
  //                   Core.builder()
  //                       .CommonBlockThickness(75.0f)
  //                       .MSPressurePlateThickness(50.0f)
  //                       .CommonRingThickness(40.0f)
  //                       .CoreDiameter(200.0f)
  //                       .WindowFactor(0.85f)
  //                       .RatioWindow(2.5f)
  //                       .CoreLossHandlingFactor(1.2f)
  //                       .CoreDensity(7.65f)
  //                       .HVToYokeClearance(50.0f)
  //                       .HVDiscSpacerThickness(3.0f)
  //                       .PhaseToPhaseClearance(45.0f)
  //                       .LVToHVClearance(30.0f)
  //                       .LVToYokeClearance(40.0f)
  //                       .CoreToLVClearance(25.0f)
  //                       .build())
  //               .value(
  //                   Value.builder()
  //                       .CuPerAlQuantityLowIfLessThan(100.0f)
  //                       .CuPerAlQuantityHighIfMoreThan(500.0f)
  //                       .EddyCurrentLoss(15.0f)
  //                       .StrayLoss(10.0f)
  //                       .InsulationPaperWeightOfConductorWeight(0.07f)
  //                       .AT_AcceptableDifference(2.0f)
  //                       .WeightActivePartsOfCoreAndWindings(1000.0f)
  //                       .DensityOfActiveParts(7.5f)
  //                       .CuPerAlStripRoundingFactor(0.5f)
  //                       .build())
  //               .HVwinding(
  //                   HV_winding.builder()
  //                       .HT_MaximumConductorDiameterLimit(3.0f)
  //                       .HT_MaximumStripThicknessLimit(5.0f)
  //                       .HT_TurnRoundUp(1.0f)
  //                       .HT_MinimumStripStartThicknessCu(1.5f)
  //                       .HT_Connection(2.0f)
  //                       .HV_RingThickness(4.0f)
  //                       .AmountOfCoilSpacer(8.0f)
  //                       .HV_SpacerWidth(25.0f)
  //                       .HV_CoilSpacerThickness(3.0f)
  //                       .build())
  //               .LVwelding(
  //                   LV_winding.builder()
  //                       .LT_MaximumStripThicknessLimit(4.0f)
  //                       .LT_MaximumStripCrossSectionLimit(120.0f)
  //                       .LT_MinimumStartThicknessCu(1.2f)
  //                       .LT_MinimumStartThicknessAl(1.5f)
  //                       .LT_MaximumStripWidth(350.0f)
  //                       .LT_TurnRoundUp(1.0f)
  //                       .LV_AmountOfTranspositions(2.0f)
  //                       .LV_EvenTurns(2.0f)
  //                       .LV_RingThickness(3.0f)
  //                       .build())
  //               .tank(
  //                   Tank.builder()
  //                       .OilQuantity(1000.0f)
  //                       .SurfaceLossDissipation(800.0f)
  //                       .WallSheetThickness(6.0f)
  //                       .TopCoverSheetThickness(8.0f)
  //                       .BottomSheetThickness(8.0f)
  //                       .WindingToWallAndClearance(75.0f)
  //                       .AmountOfConservatorBelowKVA(500.0f)
  //                       .build())
  //               .performance(
  //                   Performance.builder()
  //                       .MaximumPermissibleAmbientTemperature(40.0f)
  //                       .RelevantWindingTemperature(65.0f)
  //                       .PermissibleAxialForces(75000.0f)
  //                       .PermissibleRadialForces(50000.0f)
  //                       .Magnetization(1.7f)
  //                       .build())
  //               .materialCost(
  //                   MaterialCost.builder()
  //                       .Copper(850.0f)
  //                       .Aluminum(250.0f)
  //                       .Core(180.0f)
  //                       .Oil(120.0f)
  //                       .InsulatingPaper(450.0f)
  //                       .MS(85.0f)
  //                       .Hardware(120.0f)
  //                       .B_Relay(4500.0f)
  //                       .WTI(3500.0f)
  //                       .Dial_OTI(3500.0f)
  //                       .RadiatorValve(1200.0f)
  //                       .TapSwitch(25000.0f)
  //                       .Breather(2500.0f)
  //                       .CableBoxHV(3000.0f)
  //                       .CableBoxLV(2500.0f)
  //                       .MagneticOilGauge(1500.0f)
  //                       .MarshallingBox(4000.0f)
  //                       .HV_Bushings(5000.0f)
  //                       .LV_Bushings(4000.0f)
  //                       .CorkGasket(800.0f)
  //                       .build())
  //               .clearance(
  //                   Clearance.builder()
  //                       .HVtoYokeTop(50)
  //                       .HVtoYokeBottom(50)
  //                       .LVtoYokeTop(40)
  //                       .LVtoYokeBottom(40)
  //                       .HVCoilSpacerNT(20)
  //                       .GapHVConductor(2.5f)
  //                       .GapLVConductor(2.0f)
  //                       .HVtoLV(30)
  //                       .HVDuct(15)
  //                       .LVDuct(12)
  //                       .HVITDuck(10)
  //                       .LVITDuck(8)
  //                       .CoretoLV(25)
  //                       .PhasetoPhase(45)
  //                       .SidePadforTaperLV(20)
  //                       .SidePadforTaperHV(25)
  //                       .HVLVmidTapBreak(35)
  //                       .build())
  //               .insulation(
  //                   Insulation.builder()
  //                       .HVConductor(2.0f)
  //                       .HVLayerInsulation(1.5f)
  //                       .LVConductor(1.5f)
  //                       .LVLayerInsulation(1.0f)
  //                       .endBlock(3.0f)
  //                       .build())
  //               .build();

  //       // Create base default value
  //       BaseDefaultValueData baseDefaultValue = new BaseDefaultValueData();
  //       baseDefaultValue.setBaseValueType("standard_type");
  //       baseDefaultValue.setDefaultValues(demoValues);
  //       baseDefaultValueRepository.save(baseDefaultValue);

  //       // Create user-specific default value
  //       DefaultValueData defaultValueData =
  //           DefaultValueData.builder()
  //               .valueType("standard_type")
  //               .userId("673eb0502801503ef1ac2b36")
  //               .defaultValues(demoValues)
  //               .build();
  //       defaultValueRepository.save(defaultValueData);

  //       log.info("Demo data inserted successfully!");
  //     };
  //   }
}
