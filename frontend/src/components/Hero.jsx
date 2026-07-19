// ============================================================
// Hero.jsx — Section hero avec titre et boutons d'action
// ============================================================

const styles = {
  hero: {
    background: 'linear-gradient(135deg,#1a0000 0%,#0d0d0d 60%)',
    padding: '32px 32px 24px',
    borderBottom: '0.5px solid var(--border)',
  },
  sup: {
    fontSize: '11px',
    color: 'var(--accent)',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    fontWeight: 600,
    marginBottom: '8px',
  },
  title: {
    fontSize: '26px',
    fontWeight: 700,
    color: 'var(--text)',
    letterSpacing: '-0.5px',
  },
  sub: {
    fontSize: '13px',
    color: 'var(--text2)',
    marginTop: '4px',
  },
  actions: { display: 'flex', gap: '10px', marginTop: '20px' },
  btnPrimary: {
    background: 'var(--accent)',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    letterSpacing: '0.3px',
  },
  btnSecondary: {
    background: 'rgba(109,109,110,0.7)',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
}

const Hero = ({ onDeploy }) => (
  <div style={styles.hero}>
    <div style={styles.sup}>Internal Developer Platform</div>
    <div style={styles.title}>Deploy anything, anywhere.</div>
    <div style={styles.sub}>
      One click to production on your private K3s cluster — powered by Terraform and Ansible.
    </div>
    <div style={styles.actions}>
      <button style={styles.btnPrimary} onClick={onDeploy}>
        <i className="ti ti-rocket" /> Deploy service
      </button>
      <button style={styles.btnSecondary}>
        <i className="ti ti-chart-bar" /> View metrics
      </button>
    </div>
  </div>
)

export default Hero
