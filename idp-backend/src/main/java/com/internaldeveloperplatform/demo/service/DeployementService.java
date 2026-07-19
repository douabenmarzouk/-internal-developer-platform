package com.internaldeveloperplatform.demo.service;

import com.internaldeveloperplatform.demo.dto.DeploymentRequest;
import com.internaldeveloperplatform.demo.dto.DeploymentResponse;
import com.internaldeveloperplatform.demo.model.Deployment;
import com.internaldeveloperplatform.demo.model.DeploymentState;
import com.internaldeveloperplatform.demo.repository.DeploymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DeployementService {

    private final AnsibleService ansibleService;
    private final TerrafromService terraformService;
    private final DeploymentRepository deploymentRepository;

    @Transactional
    public DeploymentResponse deploy(DeploymentRequest request) {

        // 1. Vérifier si le service existe déjà
        if (deploymentRepository.existsByServiceName(request.getServiceName())) {
            return DeploymentResponse.builder()
                    .message("❌ Service " + request.getServiceName() + " existe déjà !")
                    .state(DeploymentState.FAILED)
                    .serviceName(request.getServiceName())
                    .build();
        }

        // 2. Sauvegarder avec statut PENDING
        Deployment deployment = Deployment.builder()
                .serviceName(request.getServiceName())
                .language(request.getLanguage())
                .replicas(request.getReplicas())
                .state(DeploymentState.PENDING)
                .namespace(request.getServiceName())
                .dockerImage(request.getServiceName() + ":latest")
                .build();

        deployment = deploymentRepository.save(deployment);

        // 3. Lancer Ansible
        boolean ansibleSuccess = ansibleService.runPlaybook(
                request.getServiceName(),
                request.getLanguage()
        );

        if (!ansibleSuccess) {
            deployment.setState(DeploymentState.FAILED);
            deploymentRepository.save(deployment);
            return DeploymentResponse.builder()
                    .id(deployment.getId())
                    .message("❌ Ansible a échoué !")
                    .state(DeploymentState.FAILED)
                    .serviceName(request.getServiceName())
                    .build();
        }

        // 4. Lancer Terraform init + apply
        terraformService.init();

        boolean terraformSuccess = terraformService.apply(
                request.getServiceName(),
                request.getLanguage(),
                request.getReplicas()
        );

        if (!terraformSuccess) {
            deployment.setState(DeploymentState.FAILED);
            deploymentRepository.save(deployment);
            return DeploymentResponse.builder()
                    .id(deployment.getId())
                    .message("❌ Terraform a échoué !")
                    .state(DeploymentState.FAILED)
                    .serviceName(request.getServiceName())
                    .build();
        }

        // 5. Tout a réussi → SUCCESS
        deployment.setState(DeploymentState.SUCCESS);
        deployment = deploymentRepository.save(deployment);

        return DeploymentResponse.builder()
                .id(deployment.getId())
                .message("✅ Microservice déployé avec succès !")
                .state(DeploymentState.SUCCESS)
                .serviceName(request.getServiceName())
                .creationDate(deployment.getCreatedAt())
                .build();
    }

    // Lister tous les déploiements
    public List<Deployment> getAllDeployments() {
        return deploymentRepository.findAll();
    }
    // Ajoute dans DeploymentService.java
    public Optional<Deployment> getDeploymentById(Long id) {
        return deploymentRepository.findById(id);
    }
    // Ajoute dans DeploymentService.java
    public List<Deployment> getDeploymentsByStatus(String state) {
        return deploymentRepository.findByState(
                DeploymentState.valueOf(state.toUpperCase())
        );
    }
    // Supprimer un déploiement
    @Transactional
    public DeploymentResponse deleteDeployment(String serviceName) {
        boolean destroyed = terraformService.destroy(serviceName);

        if (destroyed) {
            deploymentRepository.findByServiceName(serviceName)
                    .ifPresent(deploymentRepository::delete);
            return DeploymentResponse.builder()
                    .message("✅ Service " + serviceName + " supprimé !")
                    .state(DeploymentState.SUCCESS)
                    .serviceName(serviceName)
                    .build();
        }

        return DeploymentResponse.builder()
                .message("❌ Suppression échouée !")
                .state(DeploymentState.FAILED)
                .serviceName(serviceName)
                .build();
    }
}