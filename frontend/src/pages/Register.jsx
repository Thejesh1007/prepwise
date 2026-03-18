import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Register() {
  const { register } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!name || !email || !password) { setError('All fields are required.'); return }
    setLoading(true)
    setError('')
    try {
      await register(name, email, password)
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.')
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
            Create account
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-2)' }}>Start preparing smarter with PrepWise</p>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {error && <div className="error-box">{error}</div>}

          <div className="field">
            <label className="label">Full Name</label>
            <input className="input" type="text" placeholder="Your full name"
              value={name} onChange={e => { setName(e.target.value); setError('') }} />
          </div>

          <div className="field">
            <label className="label">Email</label>
            <input className="input" type="email" placeholder="you@example.com"
              value={email} onChange={e => { setEmail(e.target.value); setError('') }} />
          </div>

          <div className="field">
            <label className="label">Password</label>
            <input className="input" type="password" placeholder="Min. 6 characters"
              value={password} onChange={e => { setPassword(e.target.value); setError('') }}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
          </div>

          <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}
            style={{ width: '100%', padding: '10px', marginTop: '4px' }}>
            {loading ? <><span className="spinner" />Creating account...</> : 'Create Account'}
          </button>
        </div>

        <p style={{ textAlign: 'center', marginTop: '18px', fontSize: '13px', color: 'var(--text-2)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--accent-light)', fontWeight: '600' }}>Sign in</Link>
        </p>
      </div>
    </div>
  )
}