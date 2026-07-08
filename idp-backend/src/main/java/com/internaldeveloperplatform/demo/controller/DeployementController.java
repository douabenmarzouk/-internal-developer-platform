package com.internaldeveloperplatform.demo.controller;

import com.internaldeveloperplatform.demo.dto.DeploymentRequest;
import com.internaldeveloperplatform.demo.dto.DeploymentResponse;
import com.internaldeveloperplatform.demo.service.DeployementService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/deploy")
@RequiredArgsConstructor
public class DeployementController {

    private final DeployementService deploymentService;

    // POST /api/deploy
    // Reçoit le formulaire React et lance le déploiement
    @PostMapping
    public ResponseEntity<DeploymentResponse> deploy(
            @Valid @RequestBody DeploymentRequest request) {

        DeploymentResponse response = deploymentService.deploy(request);

        if (response.getStatus().name().equals("FAILED")) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(response);
        }

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    // DELETE /api/deploy/{serviceName}
    // Supprime un microservice déployé
    @DeleteMapping("/{serviceName}")
    public ResponseEntity<DeploymentResponse> delete(
            @PathVariable String serviceName) {

        DeploymentResponse response = deploymentService
                .deleteDeployment(serviceName);

        if (response.getStatus().name().equals("FAILED")) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(response);
        }

        return ResponseEntity.ok(response);
    }
}