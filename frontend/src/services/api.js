// ============================================================
// api.js — Appels API vers Spring Boot (port 8085)
// ============================================================

import axios from 'axios'

const API = axios.create({
  baseURL: '/api',
})

// Déployer un microservice
export const deployService = (data) =>
  API.post('/deploy', data)

// Lister tous les déploiements
export const getDeployments = () =>
  API.get('/services')

// Récupérer un déploiement par id
export const getDeploymentById = (id) =>
  API.get(`/services/${id}`)

// Supprimer un déploiement
export const deleteDeployment = (serviceName) =>
  API.delete(`/deploy/${serviceName}`)
