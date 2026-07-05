provider "helm" {
    kubernetes = {
      config_path = "~/.kube/conf"
      config_context = default
    }
}
provider "kubernetes" {
  config_path = "~/.kube/conf"
  config_context = default 
}