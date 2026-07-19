// ============================================================
// DeployModal.jsx — Modal de déploiement d'un microservice
// ============================================================

import { useState } from 'react'
import { deployService } from '../services/api'

const INITIAL_FORM = {
  serviceName: '',
  dockerImage: '',
  language: 'java',
  replicas: 1,
  environment: 'dev',
  networkExposure: 'external',
}

const DeployModal = ({ open, onClose, onDeployed }) => {
  const [form, setForm] = useState(INITIAL_FORM)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (!open) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleDeploy = async () => {
    if (!form.serviceName) { setError('Le nom du service est requis'); return }
    setLoading(true)
    setError('')
    try {
      await deployService({ ...form, replicas: Number(form.replicas) })
      setForm(INITIAL_FORM)
      onDeployed()
      onClose()
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors du déploiement')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="modal-bg open"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="modal">
        <div className="modal-title">Deploy a microservice</div>
        <div className="modal-sub">Ansible → Terraform → K3s · Average deploy time: 2m 24s</div>

        {error && (
          <div style={{ background: 'rgba(229,9,20,0.15)', color: 'var(--danger)', padding: '10px 14px', borderRadius: '4px', fontSize: '12px', marginBottom: '16px' }}>
            {error}
          </div>
        )}

        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Service name</label>
            <input className="form-input" name="serviceName" value={form.serviceName} onChange={handleChange} placeholder="user-service" />
          </div>
          <div className="form-group">
            <label className="form-label">Docker image</label>
            <input className="form-input" name="dockerImage" value={form.dockerImage} onChange={handleChange} placeholder="myapp:latest" />
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Language</label>
            <select className="form-select" name="language" value={form.language} onChange={handleChange}>
              <option value="java">Java</option>
              <option value="nodejs">Node.js</option>
              <option value="python">Python</option>
              <option value="go">Go</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Replicas</label>
            <input className="form-input" name="replicas" type="number" min="1" max="10" value={form.replicas} onChange={handleChange} />
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Environment</label>
            <select className="form-select" name="environment" value={form.environment} onChange={handleChange}>
              <option value="dev">dev</option>
              <option value="staging">staging</option>
              <option value="prod">prod</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Network</label>
            <select className="form-select" name="networkExposure" value={form.networkExposure} onChange={handleChange}>
              <option value="external">external (NodePort)</option>
              <option value="internal">internal (ClusterIP)</option>
            </select>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button
            className="btn-deploy-modal"
            onClick={handleDeploy}
            disabled={loading}
            style={{ opacity: loading ? 0.7 : 1 }}
          >
            <i className="ti ti-rocket" /> {loading ? 'Deploying...' : 'DEPLOY NOW'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeployModal
