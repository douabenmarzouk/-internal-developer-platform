package com.internaldeveloperplatform.demo.controller;

import com.internaldeveloperplatform.demo.model.Deployment;
import com.internaldeveloperplatform.demo.service.DeployementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@RequiredArgsConstructor
public class ServiceInfoController {

    private final DeployementService deploymentService;

    // GET /api/services
    // Retourne tous les déploiements
    @GetMapping
    public ResponseEntity<List<Deployment>> getAllServices() {
        return ResponseEntity.ok(
                deploymentService.getAllDeployments()
        );
    }

    // GET /api/services/{id}
    // Retourne un déploiement par id
    @GetMapping("/{id}")
    public ResponseEntity<Deployment> getServiceById(
            @PathVariable Long id) {

        return deploymentService.getDeploymentById(id)
                .map(deployment->ResponseEntity.ok(deployment))
                .orElse(ResponseEntity.notFound().build());
    }

    // GET /api/services/status/{status}
    // Retourne les déploiements par statut
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Deployment>> getByStatus(
            @PathVariable String status) {

        return ResponseEntity.ok(
                deploymentService.getDeploymentsByStatus(status)
        );
    }
}