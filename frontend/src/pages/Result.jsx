import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import api from '../api/axios.js'

export default function Result() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadResult = async () => {
      try {
        const res = await api.get(`/api/history/${id}`)
        setContent(res.data.content)
      } catch {
        setError('Failed to load this result.')
      } finally {
        setLoading(false)
      }
    }
    loadResult()
  }, [id])

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 56px)', gap: '10px', color: 'var(--text-2)', fontSize: '14px' }}>
      <span className="spinner" style={{ borderTopColor: 'var(--accent-light)' }} />
      Loading result...
    </div>
  )

  if (error) return (
    <div style={{ maxWidth: '780px', margin: '0 auto', padding: '40px 24px' }}>
      <div className="error-box" style={{ marginBottom: '16px' }}>{error}</div>
      <button className="btn btn-ghost" onClick={() => navigate('/history')}>← Back to History</button>
    </div>
  )

  return (
    <div style={{ maxWidth: '780px', margin: '0 auto', padding: '40px 24px', width: '100%' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <div>
          <div style={{ marginBottom: '8px' }}>
            <span className={`badge badge-${content.mode.toLowerCase()}`}>{content.mode}</span>
          </div>
          <h1 style={{ fontSize: '20px', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '4px' }}>
            {content.topic}
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-2)' }}>
            {content.subject} &middot;{' '}
            {new Date(content.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Link to="/generate" className="btn btn-primary btn-sm">+ New</Link>
          <Link to="/history" className="btn btn-ghost btn-sm">History</Link>
        </div>
      </div>

      {/* Options chips */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px' }}>
        {Object.entries(content.options).map(([k, v]) => (
          <span key={k} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: '20px', padding: '3px 11px',
            fontSize: '12px', color: 'var(--text-2)',
          }}>
            {k}: <span style={{ color: 'var(--text-1)', fontWeight: '500' }}>{String(v)}</span>
          </span>
        ))}
      </div>

      {/* Output */}
      <div className="card" style={{ padding: '28px 32px' }}>
        <pre style={{
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          fontSize: '14px',
          lineHeight: '1.85',
          color: 'var(--text-1)',
          fontFamily: "'DM Sans', sans-serif",
          margin: 0,
        }}>
          {content.output}
        </pre>
      </div>
    </div>
  )
}