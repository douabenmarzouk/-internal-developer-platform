📝 README complet
markdown
#  Internal Developer Platform (IDP)

> Plateforme web permettant de déployer automatiquement toute application
> conteneurisée (microservices, APIs, frontends) sur un cloud privé en un
> simple formulaire.

![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react)
![Spring Boot](https://img.shields.io/badge/SpringBoot-6DB33F?style=flat&logo=springboot)
![Terraform](https://img.shields.io/badge/Terraform-7B42BC?style=flat&logo=terraform)
![Ansible](https://img.shields.io/badge/Ansible-EE0000?style=flat&logo=ansible)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker)
![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=flat&logo=kubernetes)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=githubactions)
![Prometheus](https://img.shields.io/badge/Prometheus-E6522C?style=flat&logo=prometheus)
![Grafana](https://img.shields.io/badge/Grafana-F46800?style=flat&logo=grafana)

---

##  Description

L'IDP (Internal Developer Platform) est une plateforme qui permet à un
développeur de déployer automatiquement toute application conteneurisée
sur un cloud privé local (K3s + VMware Workstation) en remplissant un
simple formulaire React.

Inspiré des plateformes internes utilisées par Netflix, Spotify et Airbnb.

---

## 🛠️ Technologies

| Catégorie        | Technologie                    |
|------------------|-------------------------------|
| Frontend         | React + Vite                  |
| Backend          | Spring Boot + PostgreSQL      |
| Infra as Code    | Terraform                     |
| Configuration    | Ansible                       |
| Conteneurisation | Docker                        |
| Orchestration    | Kubernetes (K3s)              |
| Package Manager  | Helm                          |
| CI/CD            | GitHub Actions                |
| Monitoring       | Prometheus + Grafana          |
| Cloud Privé      | K3s + VMware Workstation      |

---

## ☁️ Architecture Cloud Privé

Windows (Machine développeur)
├── React (Frontend) → http://localhost:3000
├── Spring Boot (Backend) → http://localhost:8085
├── Docker Desktop
│ ├── PostgreSQL → port 5433
│ ├── Prometheus → port 9090
│ └── Grafana → port 3001
└── WSL Ubuntu
├── Ansible → configure VM Rocky
└── Terraform → déploie sur K3s

VM Rocky Linux (VMware Workstation)
└── K3s (Cloud Privé)
├── Applications déployées
├── Prometheus → port 30090
└── Grafana → port 30300


---

## 🏗️ Architecture

Développeur
↓
React (formulaire)
↓
Spring Boot + PostgreSQL (API)
↓
┌─────────────────────────────────────┐
│ WSL Ubuntu │
│ Ansible → prépare VM Rocky │
│ → clone repo GitHub │
│ → docker build │
│ → import image K3s │
│ Terraform → namespace K3s │
│ → deployment │
│ → service NodePort │
└─────────────────────────────────────┘
↓
K3s (VM Rocky Linux)
↓
Application déployée ✅
↓
Prometheus + Grafana (monitoring)


---

## 🔄 Fonctionnement

1. Le développeur ouvre `http://localhost:3000`
2. Remplit le formulaire :
   - **Service Name** : nom de l'application
   - **GitHub Repo** : URL du repo (doit contenir un Dockerfile)
   - **Docker Image** : image Docker Hub (optionnel)
   - **Language** : java, node, python...
   - **Replicas** : nombre de réplicas
   - **Environment** : dev, staging, prod
   - **Network** : NodePort ou ClusterIP
3. Clique sur **DEPLOY NOW**
4. Spring Boot lance **Ansible** via WSL :
   - Clone le repo GitHub
   - Build l'image Docker
   - Importe l'image dans K3s
5. Spring Boot lance **Terraform** :
   - Crée le namespace K3s
   - Crée le deployment
   - Crée le service NodePort
6. Application accessible via `http://IP_VM:NodePort`
7. **Prometheus + Grafana** surveillent en temps réel

---

## ⚠️ Convention importante

> **Le repo GitHub doit contenir un `Dockerfile` à la racine !**

mon-service/
├── Dockerfile ← obligatoire ! ✅
├── src/
└── ...


---

## ⚡ Installation

### Prérequis

| Outil | Version | Où |
|-------|---------|-----|
| Java | 17+ | Windows |
| Node.js | 18+ | Windows |
| Docker Desktop | latest | Windows |
| WSL Ubuntu | 2 | Windows |
| Ansible | latest | WSL |
| Terraform | 1.6+ | WSL |
| kubectl | latest | WSL |
| VMware Workstation | latest | Windows |
| K3s | latest | VM Rocky Linux |

---

### Lancer le projet

```bash
# 1. Lancer PostgreSQL + Frontend + Monitoring
docker-compose start

# 2. Lancer le backend
cd backend
mvn spring-boot:run

# 3. Configurer kubeconfig dans WSL
scp doua@IP_VM:/etc/rancher/k3s/k3s.yaml ~/.kube/config
sed -i 's/127.0.0.1/IP_VM/g' ~/.kube/config

# 4. Accéder à la plateforme
http://localhost:3000
```

---

## 🔄 CI/CD Pipeline

git push → main
↓
✅ Tests Backend (mvn test)
↓
✅ Build .jar
✅ Build + Push image Frontend → Docker Hub
↓
✅ Health Check
↓
❌ Notification si échec


---

## 📊 Monitoring

| Service | URL |
|---------|-----|
| Prometheus (local) | http://localhost:9090 |
| Grafana (local) | http://localhost:3001 |
| Prometheus (K3s) | http://IP_VM:30090 |
| Grafana (K3s) | http://IP_VM:30300 |

---

## 📁 Structure du projet

internal-developer-platform/
├── .github/
│ └── workflows/
│ └── deploy.yml → CI/CD pipeline
├── frontend/ → React + Vite
│ ├── src/
│ ├── Dockerfile
│ └── nginx.conf
├── backend/ → Spring Boot
│ ├── src/
│ └── Dockerfile
├── terraform/ → Infrastructure K3s
│ ├── main.tf
│ ├── variables.tf
│ ├── providers.tf
│ ├── monitoring.tf
│ └── outputs.tf
├── ansible/ → Configuration VM
│ ├── playbook.yml
│ ├── inventory/
│ │ └── hosts.yml
│ └── roles/
│ └── prepare_env/
│ ├── tasks/main.yml
│ ├── vars/main.yml
│ └── handlers/main.yml
├── k8s/ → Manifests Kubernetes
├── monitoring/ → Prometheus + Grafana config
├── docker-compose.yml
├── .env
└── README.md


---

## 🗺️ Roadmap

- [x] Frontend React + formulaire déploiement
- [x] Backend Spring Boot + PostgreSQL
- [x] Ansible → préparation VM Rocky Linux
- [x] Terraform → Infrastructure K3s
- [x] Docker Compose
- [x] CI/CD GitHub Actions
- [x] Monitoring Prometheus + Grafana
- [ ] Agent FastAPI → version full K3s
- [ ] Support multi-VM
- [ ] Interface de gestion des déploiements avancée

---

## 👤 Auteur

**Doaa Ben Marzouk**
Étudiante en Génie Informatique — ENICarthage

[![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?logo=linkedin)](https://linkedin.com/in/doua-ben-marzouk)
[![GitHub](https://img.shields.io/badge/GitHub-black?logo=github)](https://github.com/douabenmarzouk)