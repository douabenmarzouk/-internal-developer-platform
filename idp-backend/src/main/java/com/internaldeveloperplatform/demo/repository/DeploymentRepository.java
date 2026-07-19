package com.internaldeveloperplatform.demo.repository;

import com.internaldeveloperplatform.demo.model.Deployment;
import com.internaldeveloperplatform.demo.model.DeploymentState;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DeploymentRepository extends JpaRepository<Deployment, Long> {

    // Chercher par statut
    List<Deployment> findByState(DeploymentState state);

    // Chercher par namespace
    List<Deployment> findByNamespace(String namespace);

    // Chercher par nom de service
    Optional<Deployment> findByServiceName(String serviceName);

    // Chercher par langage
    List<Deployment> findByLanguage(String language);

    // Vérifier si un service existe déjà
    boolean existsByServiceName(String serviceName);

    // Chercher par statut trié par date décroissante
    List<Deployment> findByStateOrderByCreatedAtDesc(DeploymentState state);

    // Recherche par mot clé dans le nom
    @Query("SELECT d FROM Deployment d WHERE d.serviceName LIKE %:keyword%")
    List<Deployment> searchByServiceName(@Param("keyword") String keyword);
}