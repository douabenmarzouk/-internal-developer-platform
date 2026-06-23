# ============================================================
# outputs.tf
# Projet     : Internal Developer Platform (IDP)
# Auteur     : Doaa Ben Marzouk
# École      : ENICarthage
# Description: Sorties après déploiement du microservice
# ============================================================

# ---- Informations du service ------------------------------

output "service_name" {
  description = "Nom du service déployé"
  value       = var.service_name
}

output "namespace" {
  description = "Namespace où le service est déployé"
  value       = kubernetes_namespace_v1.app.metadata[0].name
}

output "environment" {
  description = "Environnement de déploiement"
  value       = var.environment
}

output "language" {
  description = "Langage du microservice"
  value       = var.language
}

# ---- Déploiement ------------------------------------------

output "replicas" {
  description = "Nombre de réplicas demandés"
  value       = var.replicas
}

output "ready_replicas" {
  description = "Nombre de réplicas prêts"
  value       = kubernetes_deployment.app.status[0].ready_replicas
}

output "docker_image" {
  description = "Image Docker déployée"
  value       = var.docker_image
}

# ---- Réseau -----------------------------------------------

output "service_port" {
  description = "Port du microservice"
  value       = var.port
}

output "network_type" {
  description = "Type de service Kubernetes"
  value       = var.network_exposure == "internal" ? "ClusterIP" : "NodePort"
}

output "node_port" {
  description = "NodePort exposé (si external)"
  value       = var.network_exposure != "internal" ? kubernetes_service.app.spec[0].port[0].node_port : null
}

output "service_url" {
  description = "URL d'accès au service"
  value       = var.create_ingress ? "http://${var.ingress_host}/${var.service_name}" : "http://$(minikube ip):${kubernetes_service.app.spec[0].port[0].node_port}"
}

# ---- Commandes kubectl ------------------------------------

output "kubectl_get_pods" {
  description = "Voir les pods"
  value       = "kubectl get pods -n ${kubernetes_namespace_v1.app.metadata[0].name} -l app=${var.service_name}"
}

output "kubectl_get_service" {
  description = "Voir le service"
  value       = "kubectl get svc ${var.service_name} -n ${kubernetes_namespace_v1.app.metadata[0].name}"
}

output "kubectl_logs" {
  description = "Voir les logs"
  value       = "kubectl logs -n ${kubernetes_namespace_v1.app.metadata[0].name} -l app=${var.service_name}"
}

output "kubectl_describe" {
  description = "Détails du déploiement"
  value       = "kubectl describe deployment ${var.service_name} -n ${kubernetes_namespace_v1.app.metadata[0].name}"
}

# ---- Monitoring -------------------------------------------

output "prometheus_url" {
  description = "URL Prometheus accessible depuis navigateur"
  value       = "http://$(minikube ip):30090"
}

output "grafana_url" {
  description = "URL Grafana accessible depuis navigateur"
  value       = "http://$(minikube ip):30300"
}

output "grafana_credentials" {
  description = "Identifiants Grafana"
  value       = "admin / admin123"
  sensitive   = true
}

output "prometheus_internal_url" {
  description = "URL Prometheus interne au cluster"
  value       = "http://prometheus-server.monitoring.svc.cluster.local:9090"
}