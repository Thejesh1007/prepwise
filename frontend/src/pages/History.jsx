import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios.js'

const modeLabels = { DESCRIPTIVE: 'Descriptive', OBJECTIVE: 'Objective', SEMINAR: 'Seminar' }

export default function History() {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deletingId, setDeletingId] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const res = await api.get('/api/history')
        setHistory(res.data.history)
      } catch {
        setError('Failed to load history.')
      } finally {
        setLoading(false)
      }
    }
    loadHistory()
  }, [])

  const handleDelete = async (id, e) => {
    e.stopPropagation()
    if (!window.confirm('Delete this item?')) return
    setDeletingId(id)
    try {
      await api.delete(`/api/history/${id}`)
      setHistory(prev => prev.filter(item => item.id !== id))
    } catch {
      alert('Failed to delete. Please try again.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 24px', width: '100%' }}>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '4px' }}>History</h1>
          <p style={{ fontSize: '14px', color: 'var(--text-2)' }}>All your previously generated content.</p>
        </div>
        <Link to="/generate" className="btn btn-primary">+ New Generation</Link>
      </div>

      {loading && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 0', gap: '10px', color: 'var(--text-2)', fontSize: '14px' }}>
          <span className="spinner" style={{ borderTopColor: 'var(--accent-light)' }} />
          Loading history...
        </div>
      )}

      {error && <div className="error-box">{error}</div>}

      {!loading && !error && history.length === 0 && (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-3)' }}>
          <div style={{ fontSize: '36px', marginBottom: '14px' }}>📭</div>
          <p style={{ fontSize: '15px', marginBottom: '20px' }}>No generations yet.</p>
          <Link to="/generate" className="btn btn-primary">Generate Something</Link>
        </div>
      )}

      {!loading && history.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {history.map(item => (
            <div
              key={item.id}
              onClick={() => navigate(`/result/${item.id}`)}
              style={{
                background: 'var(--card)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)', padding: '14px 18px',
                cursor: 'pointer', transition: 'border-color 0.15s, background 0.15s',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-hover)'; e.currentTarget.style.background = 'var(--card-hover)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--card)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                <span className={`badge badge-${item.mode.toLowerCase()}`}>
                  {modeLabels[item.mode]}
                </span>
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--text-1)' }}>
                    {item.topic}
                  </p>
                  <p style={{ fontSize: '12px', color: 'var(--text-2)' }}>{item.subject}</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                <span style={{ fontSize: '12px', color: 'var(--text-3)', whiteSpace: 'nowrap' }}>
                  {new Date(item.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
                <button
                  className="btn btn-danger"
                  onClick={(e) => handleDelete(item.id, e)}
                  disabled={deletingId === item.id}
                >
                  {deletingId === item.id ? '...' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}