package com.internaldeveloperplatform.demo.dto;

import com.internaldeveloperplatform.demo.model.Deployment;
import com.internaldeveloperplatform.demo.model.DeploymentState;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DeploymentResponse {

    private Long id;
    private String message;
    private DeploymentState state;
    private String serviceName;
    private LocalDateTime creationDate;
}