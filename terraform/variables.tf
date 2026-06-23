# ============================================================
# variables.tf
# Projet     : Internal Developer Platform (IDP)
# Auteur     : Doaa Ben Marzouk
# École      : ENICarthage
# Description: Variables du déploiement microservice
# ============================================================

# ---- Identification ---------------------------------------

variable "service_name" {
  description = "Nom du microservice à déployer"
  type        = string
  validation {
    condition     = length(var.service_name) > 2
    error_message = "Le nom doit avoir plus de 2 caractères."
  }
}

variable "docker_image" {
  description = "Image Docker du microservice"
  type        = string
  validation {
    condition     = can(regex("^[a-zA-Z0-9/_.-]+:[a-zA-Z0-9_.-]+$", var.docker_image))
    error_message = "Format attendu : 'nom:tag' ou 'registry/nom:tag'."
  }
}

variable "language" {
  description = "Langage du microservice (java, python, node, go...)"
  type        = string
  default     = "java"
}

variable "environment" {
  description = "Environnement (dev, staging, prod)"
  type        = string
  default     = "dev"
  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "L'environnement doit être: dev, staging ou prod."
  }
}

variable "namespace" {
  description = "Namespace Kubernetes"
  type        = string
  default     = "default"
}

# ---- Type de service --------------------------------------

variable "service_type" {
  description = "Type métier du microservice (api, worker, gateway, database)"
  type        = string
  default     = "api"
  validation {
    condition     = contains(["api", "worker", "gateway", "database"], var.service_type)
    error_message = "Le type doit être: api, worker, gateway ou database."
  }
}

variable "network_exposure" {
  description = "Exposition réseau : internal=ClusterIP, external=NodePort"
  type        = string
  default     = "external"
  validation {
    condition     = contains(["internal", "external"], var.network_exposure)
    error_message = "network_exposure doit être: internal ou external."
  }
}

# ---- Déploiement ------------------------------------------

variable "replicas" {
  description = "Nombre de réplicas Kubernetes"
  type        = number
  default     = 1
  validation {
    condition     = var.replicas >= 1 && var.replicas <= 10
    error_message = "Le nombre de réplicas doit être entre 1 et 10."
  }
}

variable "port" {
  description = "Port exposé par le microservice"
  type        = number
  default     = 8087
  validation {
    condition     = var.port >= 1024 && var.port <= 65535
    error_message = "Le port doit être entre 1024 et 65535."
  }
}

variable "node_port" {
  description = "NodePort fixe (optionnel, entre 30000 et 32767)"
  type        = number
  default     = null
  validation {
    condition     = var.node_port == null || (var.node_port >= 30000 && var.node_port <= 32767)
    error_message = "Le NodePort doit être entre 30000 et 32767."
  }
}

# ---- Ressources -------------------------------------------

variable "cpu_request" {
  description = "CPU minimum garanti"
  type        = string
  default     = "250m"
}

variable "cpu_limit" {
  description = "CPU maximum autorisé"
  type        = string
  default     = "500m"
}

variable "memory_request" {
  description = "Mémoire minimum garantie"
  type        = string
  default     = "256Mi"
}

variable "memory_limit" {
  description = "Mémoire maximum autorisée"
  type        = string
  default     = "512Mi"
}

# ---- Configuration ----------------------------------------

variable "env_vars" {
  description = "Variables d'environnement du microservice"
  type        = map(string)
  default     = {}
}

variable "config_map_data" {
  description = "Données supplémentaires du ConfigMap"
  type        = map(string)
  default     = {}
}

variable "labels" {
  description = "Labels Kubernetes"
  type        = map(string)
  default = {
    "managed-by" = "terraform"
    "platform"   = "idp"
    "team"       = "devops"
  }
}

# ---- Options avancées -------------------------------------

variable "create_ingress" {
  description = "Créer un Ingress pour exposer le service"
  type        = bool
  default     = false
}

variable "ingress_host" {
  description = "Host pour l'Ingress"
  type        = string
  default     = "idp.local"
}

variable "create_pvc" {
  description = "Créer un Persistent Volume Claim"
  type        = bool
  default     = false
}

variable "storage_size" {
  description = "Taille du stockage pour le PVC"
  type        = string
  default     = "1Gi"
}

variable "image_pull_secret" {
  description = "Secret pour pull les images Docker privées"
  type        = string
  default     = ""
}