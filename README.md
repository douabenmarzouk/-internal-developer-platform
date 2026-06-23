# 🚀 Internal Developer Platform (IDP)

> Plateforme web permettant de déployer automatiquement un microservice sur un cloud privé en 1 clic.

---

## 📌 Description

L'IDP (Internal Developer Platform) est une plateforme qui permet à un développeur de déployer un microservice automatiquement sur un cloud privé local (WSL + Minikube) en remplissant un simple formulaire.

Inspiré des plateformes internes utilisées par Netflix, Spotify et Airbnb.

---

## 🛠️ Technologies

| Catégorie        | Technologie           |
|------------------|-----------------------|
| Frontend         | React                 |
| Backend          | Spring Boot + MySQL   |
| Infra as Code    | Terraform             |
| Configuration    | Ansible               |
| Conteneurisation | Docker                |
| Orchestration    | Kubernetes (Minikube) |
| CI/CD            | GitHub Actions        |
| Monitoring       | Prometheus + Grafana  |
| Cloud Privé      | WSL + Minikube        |

---

## ☁️ Cloud Privé

Ce projet utilise Minikube sur WSL comme infrastructure de cloud privé local. Aucun compte cloud requis.

```
Ta machine (Windows)
└── WSL (Ubuntu)
      ├── Minikube → cloud privé
      ├── Docker
      ├── Terraform
      ├── Ansible
      └── Prometheus + Grafana
```

---

## 🏗️ Architecture

```
Développeur
     ↓
React (formulaire)
     ↓
Spring Boot + MySQL (API)
     ↓
GitHub Actions (pipeline CI/CD)
     ↓
┌─────────────────────────┐
│ Terraform → infra K8s   │
│ Ansible   → config env  │
│ Docker    → build image │
└─────────────────────────┘
     ↓
Minikube (cloud privé WSL)
     ↓
Prometheus + Grafana (monitoring)
```

---

## ⚡ Installation

### Prérequis
- Windows + WSL (Ubuntu)
- Docker Desktop
- Minikube
- kubectl
- Terraform
- Ansible
- Java 17+
- Node.js 18+

### Lancer le projet

```bash
# 1. Démarrer le cloud privé
minikube start --driver=docker

# 2. Lancer tous les services
docker-compose up -d

# 3. Lancer le backend
cd backend
./mvnw spring-boot:run

# 4. Lancer le frontend
cd frontend
npm install
npm start
```

---

## 🔄 Fonctionnement

1. Le développeur ouvre `http://localhost:3000`
2. Remplit le formulaire (nom, langage, réplicas)
3. Clique sur **Déployer**
4. Terraform crée le namespace Kubernetes
5. Ansible configure l'environnement
6. Docker build l'image du microservice
7. Kubernetes déploie automatiquement
8. Prometheus + Grafana surveillent en temps réel

---

## 📁 Structure du projet

```
internal-developer-platform/
├── .github/workflows/deploy.yml
├── frontend/
├── backend/
├── terraform/
├── ansible/
├── k8s/
├── monitoring/
├── docker-compose.yml
└── README.md
```

---

## 👤 Auteur

**Doaa Ben Marzouk**  
Étudiante en Génie Informatique — ENICarthage  
[LinkedIn](#) • [GitHub](#)