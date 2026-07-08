package com.internaldeveloperplatform.demo.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DeploymentRequest {

    @NotBlank(message = "Le nom du service est obligatoire")
    private String serviceName;

    @NotBlank(message = "Le langage est obligatoire")
    private String language;

    @NotNull(message = "Le nombre de réplicas est obligatoire")
    @Min(value = 1, message = "Minimum 1 réplica")
    @Max(value = 10, message = "Maximum 10 réplicas")
    private Integer replicas;
}