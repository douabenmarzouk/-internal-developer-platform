# ============================================================
# monitoring.tf
# Projet     : Internal Developer Platform (IDP)
# Auteur     : Doaa Ben Marzouk
# École      : ENICarthage
# Description: Installation Prometheus + Grafana via Helm
# ============================================================

# ---- Namespace Monitoring ---------------------------------
resource "kubernetes_namespace_v1" "monitoring" {
  metadata {
    name = "monitoring"
    labels = {
      "managed-by" = "terraform"
      "platform"   = "idp"
      "purpose"    = "monitoring"
    }
  }
}

# ---- Prometheus -------------------------------------------
resource "helm_release" "prometheus" {
  name       = "prometheus"
  repository = "https://prometheus-community.github.io/helm-charts"
  chart      = "prometheus"
  namespace  = kubernetes_namespace_v1.monitoring.metadata[0].name
  version    = "25.21.0"

  values = [
    yamlencode({
      server = {
        persistentVolume = {
          enabled = false
        }
        global = {
          scrape_interval = "15s"
        }
        service = {
          type     = "NodePort"
          nodePort = 30090
        }
      }
      alertmanager = {
        enabled = false
      }
    })
  ]

  depends_on = [kubernetes_namespace_v1.monitoring]
}

# ---- Grafana ----------------------------------------------
resource "helm_release" "grafana" {
  name       = "grafana"
  repository = "https://grafana.github.io/helm-charts"
  chart      = "grafana"
  namespace  = kubernetes_namespace_v1.monitoring.metadata[0].name
  version    = "8.3.6"

  values = [
    yamlencode({
      adminPassword = "admin123"

      persistence = {
        enabled = false
      }

      service = {
        type     = "NodePort"
        nodePort = 30300
      }

      datasources = {
        "datasources.yaml" = {
          apiVersion = 1
          datasources = [
            {
              name      = "Prometheus"
              type      = "prometheus"
              url       = "http://prometheus-server.monitoring.svc.cluster.local"
              isDefault = true
            }
          ]
        }
      }
    })
  ]

  depends_on = [
    kubernetes_namespace_v1.monitoring,
    helm_release.prometheus
  ]
}