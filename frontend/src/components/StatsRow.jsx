

const styles = {
  row: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1px',
    background: 'var(--border)',
    borderBottom: '0.5px solid var(--border)',
  },
  box: { background: 'var(--bg2)', padding: '20px 24px' },
  num: { fontSize: '28px', fontWeight: 700, color: 'var(--text)', letterSpacing: '-1px' },
  numUnit: { fontSize: '14px', fontWeight: 400, color: 'var(--text3)', marginLeft: '2px' },
  label: { fontSize: '11px', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '4px' },
  change: { fontSize: '11px', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' },
}

const StatsRow = ({ deployments }) => {
  // ✅ Données réelles depuis le backend
  const running = deployments.filter(d =>
    d.state === 'SUCCESS' || d.state === 'RUNNING'
  ).length

  const pending = deployments.filter(d => d.state === 'PENDING').length

  const failed = deployments.filter(d => d.state === 'FAILED').length

  const totalReplicas = deployments.reduce((acc, d) => acc + (d.replicas || 0), 0)

  const successRate = deployments.length > 0
    ? Math.round((deployments.filter(d => d.state === 'SUCCESS').length / deployments.length) * 100)
    : 0

  return (
    <div style={styles.row}>

      {/* Services running */}
      <div style={styles.box}>
        <div style={styles.num}>
          {running}
          <span style={styles.numUnit}>services</span>
        </div>
        <div style={styles.label}>Running on cluster</div>
        <div style={{ ...styles.change, color: pending > 0 ? 'var(--warning)' : 'var(--success)' }}>
          {pending > 0
            ? <><i className="ti ti-loader" style={{ fontSize: '11px' }} /> {pending} pending</>
            : <><i className="ti ti-check" style={{ fontSize: '11px' }} /> All healthy</>
          }
        </div>
      </div>

      {/* Total replicas */}
      <div style={styles.box}>
        <div style={styles.num}>
          {totalReplicas}
          <span style={styles.numUnit}>pods</span>
        </div>
        <div style={styles.label}>Total replicas</div>
        <div style={{ ...styles.change, color: 'var(--success)' }}>
          <i className="ti ti-copy" style={{ fontSize: '11px' }} /> {deployments.length} services
        </div>
      </div>

      {/* Success rate */}
      <div style={styles.box}>
        <div style={styles.num}>
          {successRate}
          <span style={styles.numUnit}>%</span>
        </div>
        <div style={styles.label}>Success rate</div>
        <div style={{ ...styles.change, color: failed > 0 ? 'var(--danger)' : 'var(--success)' }}>
          {failed > 0
            ? <><i className="ti ti-alert-circle" style={{ fontSize: '11px' }} /> {failed} failed</>
            : <><i className="ti ti-trending-up" style={{ fontSize: '11px' }} /> No failures</>
          }
        </div>
      </div>

      {/* Total deployments */}
      <div style={styles.box}>
        <div style={styles.num}>
          {deployments.length}
          <span style={styles.numUnit}>total</span>
        </div>
        <div style={styles.label}>Total deployments</div>
        <div style={{ ...styles.change, color: 'var(--success)' }}>
          <i className="ti ti-rocket" style={{ fontSize: '11px' }} /> All time
        </div>
      </div>

    </div>
  )
}

export default StatsRow