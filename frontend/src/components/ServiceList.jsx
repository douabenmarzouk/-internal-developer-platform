// ============================================================
// ServiceList.jsx
// Description: Liste des microservices déployés
// ============================================================

import { useEffect, useState } from "react";
import { getDeployments, deleteDeployment } from "../services/api";
import StatusBadge from "./StatusBadge";

const ServiceList = ({ refresh }) => {
  const [deployments, setDeployments] = useState([]);
  const [loading,     setLoading]     = useState(true);

  const fetchDeployments = async () => {
    setLoading(true);
    try {
      const res = await getDeployments();
      setDeployments(res.data);
    } catch {
      console.error("Erreur chargement déploiements");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeployments();
  }, [refresh]);

  const handleDelete = async (id) => {
    if (!confirm("Supprimer ce déploiement ?")) return;
    await deleteDeployment(id);
    fetchDeployments();
  };

  if (loading) return <p>⏳ Chargement...</p>;

  if (deployments.length === 0) return (
    <div style={{
      background: "white",
      padding: "32px",
      borderRadius: "16px",
      textAlign: "center",
      color: "#94a3b8",
    }}>
      Aucun microservice déployé
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {deployments.map((d) => (
        <div key={d.id} style={{
          background: "white",
          padding: "24px",
          borderRadius: "16px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.07)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <div>
            <h3 style={{ margin: 0, color: "#1e293b" }}>
              {d.serviceName}
            </h3>
            <p style={{ margin: "4px 0", color: "#64748b", fontSize: "14px" }}>
              {d.dockerImage} • {d.language} • {d.environment}
            </p>
            <p style={{ margin: "4px 0", color: "#64748b", fontSize: "14px" }}>
              {d.replicas} réplica(s) • port {d.port}
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <StatusBadge status={d.status} />
            <button
              onClick={() => handleDelete(d.id)}
              style={{
                background: "#fee2e2",
                color: "#dc2626",
                border: "none",
                padding: "8px 16px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              🗑️ Supprimer
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceList;