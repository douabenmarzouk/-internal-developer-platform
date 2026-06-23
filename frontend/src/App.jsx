// ============================================================
// App.jsx
// Description: Application principale IDP
// ============================================================

import { useState } from "react";
import DeployForm   from "./components/DeployForm";
import ServiceList  from "./components/ServiceList";

const App = () => {
  const [refresh, setRefresh] = useState(0);
  const [activeTab, setActiveTab] = useState("deploy");

  const handleDeployed = () => {
    setRefresh((r) => r + 1);
    setActiveTab("services");
  };

  const tabStyle = (tab) => ({
    padding: "10px 24px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px",
    background: activeTab === tab ? "#6366f1" : "white",
    color:      activeTab === tab ? "white"   : "#64748b",
  });

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f1f5f9",
      fontFamily: "Inter, sans-serif",
    }}>

      {/* Header */}
      <div style={{
        background: "white",
        padding: "16px 32px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <div>
          <h1 style={{ margin: 0, color: "#1e293b", fontSize: "22px" }}>
            🚀 Internal Developer Platform
          </h1>
          <p style={{ margin: 0, color: "#64748b", fontSize: "13px" }}>
            ENICarthage — Doaa Ben Marzouk
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "8px" }}>
          <button style={tabStyle("deploy")}   onClick={() => setActiveTab("deploy")}>
            🚀 Déployer
          </button>
          <button style={tabStyle("services")} onClick={() => setActiveTab("services")}>
            📋 Services
          </button>
        </div>
      </div>

      {/* Contenu */}
      <div style={{ maxWidth: "900px", margin: "32px auto", padding: "0 16px" }}>
        {activeTab === "deploy" && (
          <DeployForm onDeployed={handleDeployed} />
        )}
        {activeTab === "services" && (
          <ServiceList refresh={refresh} />
        )}
      </div>

    </div>
  );
};

export default App;
