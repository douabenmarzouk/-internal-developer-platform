markdown# 🚀 Internal Developer Platform (IDP)

> Plateforme web permettant de déployer automatiquement 
> un microservice sur un cloud privé (K3s + VMware) en 1 clic.

---

## 📌 Description

L'IDP (Internal Developer Platform) est une plateforme qui permet 
à un développeur de déployer un microservice automatiquement sur 
un cloud privé local (WSL + K3s + VMware) en remplissant un simple 
formulaire React.

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
| CI/CD            | GitHub Actions                |
| Monitoring       | Prometheus + Grafana          |
| Cloud Privé      | K3s + VMware Workstation      |

---

## ☁️ Cloud Privé

Ce projet utilise K3s sur VMware Workstation comme infrastructure 
de cloud privé local. Aucun compte cloud requis.
Ta machine (Windows)
├── Spring Boot     → backend API
├── React           → frontend
├── Docker Desktop
│     └── PostgreSQL
└── WSL (Ubuntu)
├── Ansible   → configuration VM
└── Terraform → infrastructure K3s
VM Rocky Linux (VMware)
└── K3s             → cloud privé
└── microservices déployés

---

## 🏗️ Architecture
Développeur
↓
React (formulaire)
↓
Spring Boot + PostgreSQL (API)
↓
ProcessBuilder → WSL
↓
┌─────────────────────────────────┐
│ Ansible   → configure VM Rocky  │
│ Terraform → crée infra K3s      │
│ Docker    → build image         │
└─────────────────────────────────┘
↓
K3s (VM Rocky Linux)
↓
Microservice déployé ✅

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
| K3s | latest | VM Rocky |

---

### Lancer le projet

```bash
# 1. Lancer PostgreSQL
docker-compose up -d

# 2. Lancer le backend
cd backend
mvn spring-boot:run

# 3. Lancer le frontend
cd frontend
npm install
npm run dev

# 4. Accéder à la plateforme
http://localhost:5173
```

---

## 🔄 Fonctionnement

1. Le développeur ouvre `http://localhost:5173`
2. Remplit le formulaire (nom, image Docker, langage, réplicas)
3. Clique sur **Déployer**
4. Spring Boot reçoit la demande
5. Ansible configure l'environnement sur la VM Rocky
6. Terraform crée le namespace + deployment + service K3s
7. K3s déploie le microservice automatiquement ✅

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

## 📁 Structure du projet
internal-developer-platform/
├── .github/
│   └── workflows/
│       └── deploy.yml      → CI/CD pipeline
├── frontend/               → React + Vite
├── backend/                → Spring Boot
├── terraform/              → Infrastructure K3s
├── ansible/                → Configuration VM
├── k8s/                    → Manifests Kubernetes
├── monitoring/             → Prometheus + Grafana
├── docker-compose.yml      → PostgreSQL + Frontend
└── README.md

---

## 🗺️ Roadmap

- [x] Terraform → Infrastructure K3s
- [x] Kubernetes manifests
- [x] Frontend React
- [x] Backend Spring Boot
- [x] Ansible → Configuration VM
- [x] Docker Compose
- [x] CI/CD GitHub Actions
- [ ] Agent FastAPI → version professionnelle
- [ ] Monitoring Prometheus + Grafana
- [ ] Déploiement full K3s

---

## 👤 Auteur

**Doaa Ben Marzouk**  
