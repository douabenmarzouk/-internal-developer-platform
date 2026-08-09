terraform {
  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "3.2.1"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "3.2.0"
    }
  }
}

provider "kubernetes" {
  config_path    = "/home/doua/.kube/config"
  config_context = "default"
}

provider "helm" {
  kubernetes = {          # ← object pas liste !
    config_path    = "/home/doua/.kube/config"
    config_context = "default"
  }
}