import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { pathname } = useLocation()

  const navLink = (to, label) => {
    const active = pathname === to
    return (
      <Link to={to} style={{
        fontSize: '13px',
        fontWeight: '500',
        padding: '5px 12px',
        borderRadius: 'var(--radius)',
        color: active ? 'var(--text-1)' : 'var(--text-2)',
        background: active ? 'var(--card)' : 'transparent',
        border: active ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'all 0.15s',
      }}>
        {label}
      </Link>
    )
  }

  return (
    <header style={{
      height: '56px',
      background: 'rgba(9,9,11,0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      {/* Logo */}
      <Link to={user ? '/dashboard' : '/'} style={{
        fontSize: '16px',
        fontWeight: '700',
        color: 'var(--text-1)',
        letterSpacing: '-0.02em',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        <span style={{
          width: '24px', height: '24px',
          background: 'var(--accent)',
          borderRadius: '6px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '12px', fontWeight: '800', color: '#fff',
        }}>P</span>
        PrepWise
      </Link>

      {/* Nav */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        {user ? (
          <>
            {navLink('/dashboard', 'Dashboard')}
            {navLink('/generate', 'Generate')}
            {navLink('/history', 'History')}
            <div className="divider" style={{ margin: '0 8px' }} />
            <span style={{ fontSize: '13px', color: 'var(--text-3)', marginRight: '4px' }}>
              {user.name.split(' ')[0]}
            </span>
            <button onClick={logout} className="btn btn-ghost btn-sm">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-ghost btn-sm">Login</Link>
            <Link to="/register" className="btn btn-primary btn-sm" style={{ marginLeft: '4px' }}>
              Get Started
            </Link>
          </>
        )}
      </div>
    </header>
  )
}