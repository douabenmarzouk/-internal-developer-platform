// ============================================================
// App.jsx — Page principale du dashboard IDP
// ============================================================

import { useState, useEffect } from 'react'
import Topbar from './components/Topbar'
import Hero from './components/Hero'
import StatsRow from './components/StatsRow'
import ServiceList from './components/ServiceList'
import BottomPanels from './components/BottomPanels'
import DeployModal from './components/DeployModal'
import { getDeployments, deleteDeployment } from './services/api'
import './styles/global.css'
import './styles/dashboard.css'

const App = () => {
  const [deployments, setDeployments] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  const fetchDeployments = async () => {
    try {
      const res = await getDeployments()
      setDeployments(res.data)
    } catch (err) {
      console.error('Erreur chargement déploiements', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDeployments()
  }, [])

  const handleDelete = async (serviceName) => {
    await deleteDeployment(serviceName)
    fetchDeployments()
  }

  return (
    <div className="app">
      <Topbar onDeploy={() => setModalOpen(true)} />

      <Hero onDeploy={() => setModalOpen(true)} />

      <StatsRow deployments={deployments} />

      <div style={{ padding: '24px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '3px', height: '16px', background: 'var(--accent)', borderRadius: '2px' }} />
            Active services
          </div>
          <span style={{ fontSize: '12px', color: 'var(--accent)', cursor: 'pointer' }}>
            See all
          </span>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', color: 'var(--text3)', padding: '40px' }}>
            ⏳ Loading...
          </div>
        ) : (
          <ServiceList deployments={deployments} onDelete={handleDelete} />
        )}

        <BottomPanels deployments={deployments} />
      </div>

      <DeployModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onDeployed={fetchDeployments}
      />
    </div>
  )
}

export default App
