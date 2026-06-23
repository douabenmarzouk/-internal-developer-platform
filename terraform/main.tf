# ============================================================
# main.tf
# Projet     : Internal Developer Platform (IDP)
# Auteur     : Doaa Ben Marzouk
# École      : ENICarthage
# Description: Ressources Kubernetes du microservice
# ============================================================

# ---- Namespace --------------------------------------------
resource "kubernetes_namespace_v1" "app" {
  metadata {
    name = var.namespace
    labels = {
      "environment" = var.environment
      "managed-by"  = "terraform"
      "platform"    = "idp"
    }
  }
}

# ---- ConfigMap --------------------------------------------
resource "kubernetes_config_map" "app_config" {
  metadata {
    name      = "${var.service_name}-config"
    namespace = kubernetes_namespace_v1.app.metadata[0].name
  }

  data = merge(var.config_map_data, {
    "SERVICE_NAME" = var.service_name
    "ENVIRONMENT"  = var.environment
    "SERVICE_TYPE" = var.service_type
    "LANGUAGE"     = var.language
  })

  depends_on = [kubernetes_namespace_v1.app]
}

# ---- ServiceAccount ---------------------------------------
resource "kubernetes_service_account" "app_sa" {
  metadata {
    name      = "${var.service_name}-sa"
    namespace = kubernetes_namespace_v1.app.metadata[0].name
  }
  automount_service_account_token = true

  depends_on = [kubernetes_namespace_v1.app]
}

# ---- Deployment -------------------------------------------
resource "kubernetes_deployment" "app" {
  metadata {
    name      = var.service_name
    namespace = kubernetes_namespace_v1.app.metadata[0].name
    labels = merge(var.labels, {
      app         = var.service_name
      environment = var.environment
      language    = var.language
    })
  }

  spec {
    replicas = var.replicas

    selector {
      match_labels = {
        app = var.service_name
      }
    }

    template {
      metadata {
        labels = merge(var.labels, {
          app         = var.service_name
          environment = var.environment
        })
      }

      spec {
        service_account_name = kubernetes_service_account.app_sa.metadata[0].name

        container {
          name  = var.service_name
          image = var.docker_image

          port {
            container_port = var.port
          }

          resources {
            requests = {
              cpu    = var.cpu_request
              memory = var.memory_request
            }
            limits = {
              cpu    = var.cpu_limit
              memory = var.memory_limit
            }
          }

          # Variables d'environnement dynamiques
          dynamic "env" {
            for_each = var.env_vars
            content {
              name  = env.key
              value = env.value
            }
          }

          # Variables depuis ConfigMap
          env_from {
            config_map_ref {
              name = kubernetes_config_map.app_config.metadata[0].name
            }
          }
        }
      }
    }
  }

  depends_on = [
    kubernetes_namespace_v1.app,
    kubernetes_config_map.app_config,
    kubernetes_service_account.app_sa
  ]
}

# ---- Service ----------------------------------------------
resource "kubernetes_service" "app" {
  metadata {
    name      = var.service_name
    namespace = kubernetes_namespace_v1.app.metadata[0].name
    labels    = var.labels
  }

  spec {
    # ✅ Corrigé : network_exposure
    type = var.network_exposure == "internal" ? "ClusterIP" : "NodePort"

    selector = {
      app = var.service_name
    }

    port {
      name        = "http"
      port        = var.port
      target_port = var.port
      # ✅ node_port utilisé si défini
      node_port   = var.network_exposure == "internal" ? null : var.node_port
    }
  }

  depends_on = [kubernetes_namespace_v1.app]
}

# ---- Ingress (optionnel) ----------------------------------
resource "kubernetes_ingress_v1" "app_ingress" {
  count = var.create_ingress ? 1 : 0

  metadata {
    name      = "${var.service_name}-ingress"
    namespace = kubernetes_namespace_v1.app.metadata[0].name
    annotations = {
      "nginx.ingress.kubernetes.io/rewrite-target" = "/"
    }
  }

  spec {
    ingress_class_name = "nginx"
    rule {
      host = var.ingress_host
      http {
        path {
          path_type = "Prefix"
          path      = "/${var.service_name}"
          backend {
            service {
              name = kubernetes_service.app.metadata[0].name
              port {
                number = var.port
              }
            }
          }
        }
      }
    }
  }

  depends_on = [kubernetes_service.app]
}

# ---- PVC (optionnel) --------------------------------------
resource "kubernetes_persistent_volume_claim" "app_pvc" {
  count = var.create_pvc ? 1 : 0

  metadata {
    name      = "${var.service_name}-pvc"
    namespace = kubernetes_namespace_v1.app.metadata[0].name
  }

  spec {
    access_modes = ["ReadWriteOnce"]
    resources {
      requests = {
        storage = var.storage_size
      }
    }
  }

  depends_on = [kubernetes_namespace_v1.app]
}