import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!email || !password) { setError('Both fields are required.'); return }
    setLoading(true)
    setError('')
    try {
      await login(email, password)
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: 'calc(100vh - 56px)', padding: '24px',
    }}>
      <div style={{ width: '100%', maxWidth: '380px' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '6px', letterSpacing: '-0.02em' }}>
            Welcome back
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-2)' }}>Sign in to your PrepWise account</p>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {error && <div className="error-box">{error}</div>}

          <div className="field">
            <label className="label">Email</label>
            <input className="input" type="email" placeholder="you@example.com"
              value={email} onChange={e => { setEmail(e.target.value); setError('') }} />
          </div>

          <div className="field">
            <label className="label">Password</label>
            <input className="input" type="password" placeholder="••••••••"
              value={password} onChange={e => { setPassword(e.target.value); setError('') }}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
          </div>

          <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}
            style={{ width: '100%', padding: '10px', marginTop: '4px' }}>
            {loading ? <><span className="spinner" />Signing in...</> : 'Sign In'}
          </button>
        </div>

        <p style={{ textAlign: 'center', marginTop: '18px', fontSize: '13px', color: 'var(--text-2)' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: 'var(--accent-light)', fontWeight: '600' }}>Register</Link>
        </p>
      </div>
    </div>
  )
}