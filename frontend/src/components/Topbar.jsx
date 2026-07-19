// ============================================================
// Topbar.jsx — Barre de navigation principale
// ============================================================

import { useState } from 'react'

const styles = {
  topbar: {
    background: 'linear-gradient(180deg,rgba(0,0,0,0.9) 0%,transparent 100%)',
    padding: '0 32px',
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'sticky',
    top: 0,
    zIndex: 50,
    backdropFilter: 'blur(12px)',
    borderBottom: '0.5px solid var(--border)',
  },
  logo: {
    fontSize: '20px',
    fontWeight: 700,
    color: 'var(--accent)',
    letterSpacing: '-0.5px',
    fontStyle: 'italic',
  },
  nav: { display: 'flex', gap: '24px' },
  navItem: (active) => ({
    fontSize: '13px',
    color: active ? 'var(--text)' : 'var(--text2)',
    cursor: 'pointer',
    padding: '4px 0',
    borderBottom: active ? '2px solid var(--accent)' : '2px solid transparent',
    transition: 'all 0.2s',
  }),
  avatar: {
    width: '32px',
    height: '32px',
    borderRadius: '4px',
    background: 'var(--accent)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 700,
    cursor: 'pointer',
  },
}

const NAV_ITEMS = ['Dashboard', 'Services', 'Pipelines', 'Monitoring', 'Settings']

const Topbar = ({ onDeploy }) => {
  const [active, setActive] = useState('Dashboard')

  return (
    <div style={styles.topbar}>
      <div style={styles.logo}>IDP</div>

      <div style={styles.nav}>
        {NAV_ITEMS.map((item) => (
          <div
            key={item}
            style={styles.navItem(active === item)}
            onClick={() => setActive(item)}
          >
            {item}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <i className="ti ti-bell" style={{ color: 'var(--text2)', fontSize: '16px', cursor: 'pointer' }} />
        <div style={styles.avatar}>DB</div>
      </div>
    </div>
  )
}

export default Topbar
