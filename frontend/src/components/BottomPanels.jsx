

const LOG_BADGE = {
  ok: 'log-ok',
  warn: 'log-warn',
  err: 'log-err',
}
const LOG_LABEL = { ok: 'OK', warn: 'WAIT', err: 'ERR' }

// Génère les logs depuis les vrais déploiements
const generateLogs = (deployments) => {
  if (!deployments.length) return []

  return deployments.slice(0, 6).map(d => ({
    time: d.creationDate
      ? new Date(d.creationDate).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      : '--:--',
    type: d.state === 'FAILED' ? 'err' : d.state === 'PENDING' ? 'warn' : 'ok',
    text: d.state === 'SUCCESS'
      ? `${d.serviceName} deployed — ${d.replicas} replica(s)`
      : d.state === 'PENDING'
      ? `${d.serviceName} deploying...`
      : `${d.serviceName} deployment failed`,
  }))
}

const BottomPanels = ({ deployments }) => {

  // ✅ Activité réelle depuis le backend
  const activities = deployments.slice(0, 4).map(d => ({
    type: d.state === 'FAILED' ? 'fail' : d.state === 'PENDING' ? 'scale' : 'deploy',
    text: d.state === 'FAILED'
      ? `${d.serviceName} deployment failed`
      : d.state === 'PENDING'
      ? `${d.serviceName} deploying...`
      : `${d.serviceName} deployed to K3s`,
    time: `${d.language} · ${d.replicas} replica(s)`,
    icon: d.state === 'FAILED' ? 'ti-x' : d.state === 'PENDING' ? 'ti-loader' : 'ti-rocket',
    iconColor: d.state === 'FAILED'
      ? 'var(--danger)'
      : d.state === 'PENDING'
      ? 'var(--warning)'
      : 'var(--success)',
    actClass: d.state === 'FAILED' ? 'act-fail' : d.state === 'PENDING' ? 'act-scale' : 'act-deploy',
  }))

  // ✅ Logs réels depuis le backend
  const logs = generateLogs(deployments)

  return (
    <div className="bottom-grid">

      {/* ---- Logs pipeline -------------------------------- */}
      <div className="panel">
        <div className="panel-title">
          <i className="ti ti-terminal-2" style={{ color: 'var(--accent)', fontSize: '14px' }} />
          Pipeline logs
        </div>

        {logs.length > 0 ? (
          logs.map((log, i) => (
            <div className="log-entry" key={i}>
              <div className="log-time">{log.time}</div>
              <div className={`log-badge ${LOG_BADGE[log.type]}`}>
                {LOG_LABEL[log.type]}
              </div>
              <div className="log-text">{log.text}</div>
            </div>
          ))
        ) : (
          <div style={{ fontSize: '12px', color: 'var(--text3)', padding: '20px 0', textAlign: 'center' }}>
            Aucun déploiement encore
          </div>
        )}
      </div>

      {/* ---- Activité récente ----------------------------- */}
      <div className="panel">
        <div className="panel-title">
          <i className="ti ti-activity" style={{ color: 'var(--accent)', fontSize: '14px' }} />
          Recent activity
        </div>

        {activities.length > 0 ? (
          activities.map((act, i) => (
            <div className="activity-item" key={i}>
              <div className={`act-icon ${act.actClass}`}>
                <i className={`ti ${act.icon}`} style={{ color: act.iconColor, fontSize: '12px' }} />
              </div>
              <div>
                <div className="act-text">{act.text}</div>
                <div className="act-time">{act.time}</div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ fontSize: '12px', color: 'var(--text3)', padding: '20px 0', textAlign: 'center' }}>
            Aucune activité récente
          </div>
        )}

        {/* Cluster health — statique pour l'instant */}
        <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '0.5px solid var(--border)' }}>
          <div style={{ fontSize: '11px', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
            Cluster health
          </div>

          {/* Services status */}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text2)', marginBottom: '4px' }}>
            <span>Success</span>
            <span style={{ color: 'var(--success)' }}>
              {deployments.filter(d => d.state === 'SUCCESS').length} services
            </span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{
              width: deployments.length > 0
                ? `${(deployments.filter(d => d.state === 'SUCCESS').length / deployments.length) * 100}%`
                : '0%'
            }} />
          </div>

          {/* Failed status */}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text2)', margin: '8px 0 4px' }}>
            <span>Failed</span>
            <span style={{ color: deployments.filter(d => d.state === 'FAILED').length > 0 ? 'var(--danger)' : 'var(--success)' }}>
              {deployments.filter(d => d.state === 'FAILED').length} services
            </span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{
              width: deployments.length > 0
                ? `${(deployments.filter(d => d.state === 'FAILED').length / deployments.length) * 100}%`
                : '0%',
              background: 'var(--danger)'
            }} />
          </div>

          {/* Pending status */}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text2)', margin: '8px 0 4px' }}>
            <span>Pending</span>
            <span style={{ color: 'var(--warning)' }}>
              {deployments.filter(d => d.state === 'PENDING').length} services
            </span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{
              width: deployments.length > 0
                ? `${(deployments.filter(d => d.state === 'PENDING').length / deployments.length) * 100}%`
                : '0%',
              background: 'var(--warning)'
            }} />
          </div>
        </div>
      </div>

    </div>
  )
}

export default BottomPanels