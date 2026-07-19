// ============================================================
// ServiceList.jsx — Liste des microservices déployés
// ============================================================

import { deleteDeployment } from '../services/api'

const LANG_CONFIG = {
  java: { cls: 'thumb-java', icon: 'ti-coffee', tag: 'tag-java', label: 'Java' },
  nodejs: { cls: 'thumb-node', icon: 'ti-brand-nodejs', tag: 'tag-node', label: 'Node.js' },
  python: { cls: 'thumb-python', icon: 'ti-brand-python', tag: 'tag-python', label: 'Python' },
  go: { cls: 'thumb-go', icon: 'ti-brand-golang', tag: 'tag-go', label: 'Go' },
}

const STATUS_DOT = {
  SUCCESS: 'dot-success',
  RUNNING: 'dot-success',
  PENDING: 'dot-warning',
  FAILED: 'dot-danger',
}

const ReplicasBar = ({ replicas, max = 5 }) => (
  <div style={{ display: 'flex', gap: '3px', alignItems: 'center', flexShrink: 0 }}>
    {Array.from({ length: max }).map((_, i) => (
      <div
        key={i}
        style={{
          width: '16px',
          height: '4px',
          borderRadius: '2px',
          background: i < replicas ? 'var(--success)' : 'var(--border2)',
        }}
      />
    ))}
  </div>
)

const ServiceRow = ({ deployment, rank, onDelete }) => {
  const lang = LANG_CONFIG[deployment.language?.toLowerCase()] || LANG_CONFIG.java
  const dotClass = STATUS_DOT[deployment.state] || 'dot-muted'

  const handleDelete = async () => {
    if (!confirm(`Supprimer ${deployment.serviceName} ?`)) return
    try {
      await onDelete(deployment.serviceName)
    } catch (err) {
      alert('Erreur lors de la suppression')
    }
  }

  return (
    <div className="service-row">
      <div className="service-rank">{rank}</div>

      <div className={`service-thumb ${lang.cls}`}>
        <i className={`ti ${lang.icon}`} />
      </div>

      <div className="service-info">
        <div className="service-name">{deployment.serviceName}</div>
        <div className="service-detail">
          {deployment.dockerImage} · namespace: {deployment.namespace}
        </div>
      </div>

      <div className="service-tags">
        <span className={`tag ${lang.tag}`}>{lang.label}</span>
      </div>

      <ReplicasBar replicas={deployment.replicas || 0} />

      <div style={{ fontSize: '11px', color: 'var(--text3)', minWidth: '60px', textAlign: 'center' }}>
        {deployment.replicas} / 5 pods
      </div>

      <div className={`status-dot ${dotClass}`} />

      <div className="service-actions">
        <button className="icon-btn" title="Logs">
          <i className="ti ti-terminal" />
        </button>
        <button className="icon-btn" title="Supprimer" onClick={handleDelete}>
          <i className="ti ti-trash" />
        </button>
      </div>
    </div>
  )
}

const ServiceList = ({ deployments, onDelete }) => {
  if (!deployments.length) {
    return (
      <div style={{ textAlign: 'center', color: 'var(--text3)', padding: '40px', background: 'var(--bg2)', borderRadius: '6px' }}>
        Aucun microservice déployé
      </div>
    )
  }

  return (
    <div className="services-grid">
      {deployments.map((d, i) => (
        <ServiceRow key={d.id} deployment={d} rank={i + 1} onDelete={onDelete} />
      ))}
    </div>
  )
}

export default ServiceList
