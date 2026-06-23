// ============================================================
// StatusBadge.jsx
// Description: Badge de statut du déploiement
// ============================================================

const StatusBadge = ({ status }) => {
  const styles = {
    RUNNING:  { background: "#22c55e", color: "white" },
    PENDING:  { background: "#f59e0b", color: "white" },
    FAILED:   { background: "#ef4444", color: "white" },
    STOPPED:  { background: "#6b7280", color: "white" },
  };

  return (
    <span style={{
      ...styles[status] || styles.STOPPED,
      padding: "4px 12px",
      borderRadius: "999px",
      fontSize: "12px",
      fontWeight: "bold",
    }}>
      {status}
    </span>
  );
};

export default StatusBadge;