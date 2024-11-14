package com.transformer.design;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TransformerDesignApplication {

    public static void main(String[] args) {
        SpringApplication.run(TransformerDesignApplication.class, args);
    }

    // @Bean
    // CommandLineRunner runner(DefaultValueRepository defaultValueRepository,
    //         BaseDefaultValueRepository baseDefaultValueRepository) {
    //     return args -> {
    //         // Create demo default values
    //         DefaultValues demoValues = new DefaultValues();
    //         // Set demo values according to your DefaultValues class structure
    //         // Create base default value
    //         BaseDefaultValueData baseDefaultValue = new BaseDefaultValueData();
    //         baseDefaultValue.setBaseValueType("standard_type");
    //         baseDefaultValue.setDefaultValues(demoValues);
    //         baseDefaultValueRepository.save(baseDefaultValue);
    //         // Create user-specific default value
    //         DefaultValueData defaultValueData = DefaultValueData.builder()
    //                 .valueType("standard_type")
    //                 .userId("6734b477ed76541d9612a2a2")
    //                 .defaultValues(demoValues)
    //                 .build();
    //         defaultValueRepository.save(defaultValueData);
    //     };
    // }
}
