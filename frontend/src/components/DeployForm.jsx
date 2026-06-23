// ============================================================
// DeployForm.jsx
// Description: Formulaire de déploiement d'un microservice
// ============================================================

import { useState } from "react";
import { deployService } from "../services/api";

const DeployForm = ({ onDeployed }) => {
  const [form, setForm] = useState({
    serviceName:   "",
    dockerImage:   "",
    language:      "java",
    replicas:      1,
    port:          8080,
    environment:   "dev",
    serviceType:   "api",
    networkExposure: "external",
    cpuRequest:    "250m",
    cpuLimit:      "500m",
    memoryRequest: "256Mi",
    memoryLimit:   "512Mi",
  });

  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await deployService(form);
      onDeployed();
    } catch (err) {
      setError("Erreur lors du déploiement !");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    fontSize: "14px",
    marginTop: "4px",
  };

  const labelStyle = {
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
  };

  return (
    <form onSubmit={handleSubmit} style={{
      background: "white",
      padding: "32px",
      borderRadius: "16px",
      boxShadow: "0 4px 6px rgba(0,0,0,0.07)",
    }}>
      <h2 style={{ marginBottom: "24px", color: "#1e293b" }}>
        🚀 Déployer un Microservice
      </h2>

      {error && (
        <div style={{
          background: "#fee2e2",
          color: "#dc2626",
          padding: "12px",
          borderRadius: "8px",
          marginBottom: "16px",
        }}>
          {error}
        </div>
      )}

      {/* Nom du service */}
      <div style={{ marginBottom: "16px" }}>
        <label style={labelStyle}>Nom du service *</label>
        <input
          style={inputStyle}
          name="serviceName"
          value={form.serviceName}
          onChange={handleChange}
          placeholder="ex: user-service"
          required
        />
      </div>

      {/* Image Docker */}
      <div style={{ marginBottom: "16px" }}>
        <label style={labelStyle}>Image Docker *</label>
        <input
          style={inputStyle}
          name="dockerImage"
          value={form.dockerImage}
          onChange={handleChange}
          placeholder="ex: myapp:1.0"
          required
        />
      </div>

      {/* Langage + Environnement */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
        <div>
          <label style={labelStyle}>Langage</label>
          <input
            style={inputStyle}
            name="language"
            value={form.language}
            onChange={handleChange}
            placeholder="java, python, node..."
          />
        </div>
        <div>
          <label style={labelStyle}>Environnement</label>
          <select style={inputStyle} name="environment" value={form.environment} onChange={handleChange}>
            <option value="dev">dev</option>
            <option value="staging">staging</option>
            <option value="prod">prod</option>
          </select>
        </div>
      </div>

      {/* Réplicas + Port */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
        <div>
          <label style={labelStyle}>Réplicas</label>
          <input
            style={inputStyle}
            name="replicas"
            type="number"
            min="1"
            max="10"
            value={form.replicas}
            onChange={handleChange}
          />
        </div>
        <div>
          <label style={labelStyle}>Port</label>
          <input
            style={inputStyle}
            name="port"
            type="number"
            value={form.port}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Type service + Exposition réseau */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
        <div>
          <label style={labelStyle}>Type de service</label>
          <select style={inputStyle} name="serviceType" value={form.serviceType} onChange={handleChange}>
            <option value="api">api</option>
            <option value="worker">worker</option>
            <option value="gateway">gateway</option>
            <option value="database">database</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>Exposition réseau</label>
          <select style={inputStyle} name="networkExposure" value={form.networkExposure} onChange={handleChange}>
            <option value="external">external (NodePort)</option>
            <option value="internal">internal (ClusterIP)</option>
          </select>
        </div>
      </div>

      {/* Ressources CPU */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
        <div>
          <label style={labelStyle}>CPU Request</label>
          <input style={inputStyle} name="cpuRequest" value={form.cpuRequest} onChange={handleChange} />
        </div>
        <div>
          <label style={labelStyle}>CPU Limit</label>
          <input style={inputStyle} name="cpuLimit" value={form.cpuLimit} onChange={handleChange} />
        </div>
      </div>

      {/* Ressources Mémoire */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
        <div>
          <label style={labelStyle}>Memory Request</label>
          <input style={inputStyle} name="memoryRequest" value={form.memoryRequest} onChange={handleChange} />
        </div>
        <div>
          <label style={labelStyle}>Memory Limit</label>
          <input style={inputStyle} name="memoryLimit" value={form.memoryLimit} onChange={handleChange} />
        </div>
      </div>

      {/* Bouton */}
      <button
        type="submit"
        disabled={loading}
        style={{
          width: "100%",
          padding: "14px",
          background: loading ? "#94a3b8" : "#6366f1",
          color: "white",
          border: "none",
          borderRadius: "10px",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "⏳ Déploiement en cours..." : "🚀 Déployer"}
      </button>
    </form>
  );
};

export default DeployForm;