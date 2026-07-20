# 📊 Monitoring — IDP Platform

## Architecture

```
Spring Boot → /actuator/prometheus
                    ↓
              Prometheus (collecte)
                    ↓
              Grafana (visualise)
```

## Lancer le monitoring

```bash
# Depuis la racine du projet
docker-compose -f docker-compose.yml \
               -f monitoring/docker-compose.monitoring.yml up -d
```

## Accès

| Service    | URL                        | Credentials     |
|------------|----------------------------|-----------------|
| Prometheus | http://localhost:9090      | aucun           |
| Grafana    | http://localhost:3001      | admin / admin   |

## Dashboards Grafana à importer

| Dashboard          | ID    | Description              |
|--------------------|-------|--------------------------|
| Spring Boot        | 12900 | Métriques JVM + HTTP     |
| JVM Micrometer     | 4701  | Métriques JVM détaillées |
| K3s Cluster        | 15661 | Métriques Kubernetes     |

### Comment importer un dashboard
```
Grafana → + → Import → Dashboard ID → Load
```

## Vérifier que Spring Boot expose les métriques

```bash
curl http://localhost:8085/actuator/prometheus
# → tu vois des métriques ✅
```
