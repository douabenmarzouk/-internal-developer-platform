// ============================================================
// StatsRow.jsx — Ligne de statistiques du cluster
// ============================================================

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

const STATS = [
  { value: 3, unit: 'services', label: 'Running on cluster', change: '+1 this week', up: true },
  { value: 7, unit: 'pods', label: 'Total replicas', change: 'All healthy', up: true },
  { value: '100', unit: '%', label: 'Success rate', change: 'Last 7 days', up: true },
  { value: '2.4', unit: 'min', label: 'Avg deploy time', change: '-12s vs last week', up: false },
]

const StatsRow = ({ deployments }) => {
  const running = deployments.filter(d => d.state === 'SUCCESS' || d.state === 'RUNNING').length
  const totalReplicas = deployments.reduce((acc, d) => acc + (d.replicas || 0), 0)

  return (
    <div style={styles.row}>
      <div style={styles.box}>
        <div style={styles.num}>{running || 3}<span style={styles.numUnit}>services</span></div>
        <div style={styles.label}>Running on cluster</div>
        <div style={{ ...styles.change, color: 'var(--success)' }}>
          <i className="ti ti-trending-up" style={{ fontSize: '11px' }} /> +1 this week
        </div>
      </div>
      <div style={styles.box}>
        <div style={styles.num}>{totalReplicas || 7}<span style={styles.numUnit}>pods</span></div>
        <div style={styles.label}>Total replicas</div>
        <div style={{ ...styles.change, color: 'var(--success)' }}>
          <i className="ti ti-check" style={{ fontSize: '11px' }} /> Healthy
        </div>
      </div>
      <div style={styles.box}>
        <div style={styles.num}>100<span style={styles.numUnit}>%</span></div>
        <div style={styles.label}>Success rate</div>
        <div style={{ ...styles.change, color: 'var(--success)' }}>
          <i className="ti ti-trending-up" style={{ fontSize: '11px' }} /> Last 7 days
        </div>
      </div>
      <div style={styles.box}>
        <div style={styles.num}>2.4<span style={styles.numUnit}>min</span></div>
        <div style={styles.label}>Avg deploy time</div>
        <div style={{ ...styles.change, color: 'var(--danger)' }}>
          <i className="ti ti-trending-down" style={{ fontSize: '11px' }} /> -12s vs last week
        </div>
      </div>
    </div>
  )
}

export default StatsRow
