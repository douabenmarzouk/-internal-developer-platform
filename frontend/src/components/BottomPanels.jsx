// ============================================================
// BottomPanels.jsx — Logs pipeline + Activité récente
// ============================================================

const MOCK_LOGS = [
  { time: '14:32', type: 'ok', text: 'terraform apply — ml-service complete' },
  { time: '14:31', type: 'ok', text: 'ansible playbook finished in 42s' },
  { time: '14:30', type: 'ok', text: 'docker build ml-service:0.9 success' },
  { time: '14:28', type: 'warn', text: 'k3s pod initializing (0/2 ready)' },
  { time: '13:15', type: 'ok', text: 'user-service deployed — 3 replicas' },
  { time: '11:03', type: 'err', text: 'payment-service image build failed' },
]

const LOG_BADGE = {
  ok: 'log-ok',
  warn: 'log-warn',
  err: 'log-err',
  info: 'log-info',
}
const LOG_LABEL = { ok: 'OK', warn: 'WAIT', err: 'ERR', info: 'INFO' }

const BottomPanels = ({ deployments }) => {
  const activities = deployments.slice(0, 4).map(d => ({
    type: d.state === 'FAILED' ? 'fail' : d.state === 'PENDING' ? 'scale' : 'deploy',
    text: `${d.serviceName} ${d.state === 'FAILED' ? 'deployment failed' : 'deployed to K3s cluster'}`,
    time: `${d.language} · ${d.replicas} replicas`,
    icon: d.state === 'FAILED' ? 'ti-x' : 'ti-rocket',
    iconColor: d.state === 'FAILED' ? 'var(--danger)' : 'var(--success)',
  }))

  return (
    <div className="bottom-grid">
      {/* Logs pipeline */}
      <div className="panel">
        <div className="panel-title">
          <i className="ti ti-terminal-2" style={{ color: 'var(--accent)', fontSize: '14px' }} />
          Pipeline logs
        </div>
        {MOCK_LOGS.map((log, i) => (
          <div className="log-entry" key={i}>
            <div className="log-time">{log.time}</div>
            <div className={`log-badge ${LOG_BADGE[log.type]}`}>{LOG_LABEL[log.type]}</div>
            <div className="log-text">{log.text}</div>
          </div>
        ))}
      </div>

      {/* Activité récente */}
      <div className="panel">
        <div className="panel-title">
          <i className="ti ti-activity" style={{ color: 'var(--accent)', fontSize: '14px' }} />
          Recent activity
        </div>

        {activities.length > 0 ? activities.map((act, i) => (
          <div className="activity-item" key={i}>
            <div className={`act-icon act-${act.type}`}>
              <i className={`ti ${act.icon}`} style={{ color: act.iconColor, fontSize: '12px' }} />
            </div>
            <div>
              <div className="act-text">{act.text}</div>
              <div className="act-time">{act.time}</div>
            </div>
          </div>
        )) : (
          <>
            <div className="activity-item">
              <div className="act-icon act-deploy"><i className="ti ti-rocket" style={{ color: 'var(--success)', fontSize: '12px' }} /></div>
              <div><div className="act-text">ml-service deployed to K3s cluster</div><div className="act-time">2 minutes ago · Python · 2 replicas</div></div>
            </div>
            <div className="activity-item">
              <div className="act-icon act-scale"><i className="ti ti-arrows-maximize" style={{ color: '#3b9eff', fontSize: '12px' }} /></div>
              <div><div className="act-text">api-gateway scaled to 2 replicas</div><div className="act-time">1 hour ago · Node.js</div></div>
            </div>
            <div className="activity-item">
              <div className="act-icon act-fail"><i className="ti ti-x" style={{ color: 'var(--danger)', fontSize: '12px' }} /></div>
              <div><div className="act-text">payment-service deployment failed</div><div className="act-time">Yesterday · Docker build error</div></div>
            </div>
          </>
        )}

        {/* Cluster health */}
        <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '0.5px solid var(--border)' }}>
          <div style={{ fontSize: '11px', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Cluster health</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text2)', marginBottom: '4px' }}>
            <span>CPU usage</span><span style={{ color: 'var(--success)' }}>73%</span>
          </div>
          <div className="progress-bar"><div className="progress-fill" /></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text2)', margin: '8px 0 4px' }}>
            <span>Memory</span><span style={{ color: 'var(--warning)' }}>1.4 / 2 GB</span>
          </div>
          <div className="progress-bar"><div className="progress-fill" style={{ width: '70%', background: 'var(--warning)' }} /></div>
        </div>
      </div>
    </div>
  )
}

export default BottomPanels
