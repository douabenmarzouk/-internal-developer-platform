// ============================================================
// api.js
// Projet     : Internal Developer Platform (IDP)
// Auteur     : Doaa Ben Marzouk
// École      : ENICarthage
// Description: Appels API vers Spring Boot
// ============================================================

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

// ---- Déployer un microservice
export const deployService = (data) =>
  API.post("/deployments", data);

// ---- Récupérer tous les déploiements
export const getDeployments = () =>
  API.get("/deployments");

// ---- Récupérer un déploiement par id
export const getDeploymentById = (id) =>
  API.get(`/deployments/${id}`);

// ---- Supprimer un déploiement
export const deleteDeployment = (id) =>
  API.delete(`/deployments/${id}`);