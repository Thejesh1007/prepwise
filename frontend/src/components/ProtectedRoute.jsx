import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        minHeight: 'calc(100vh - 60px)', color: 'var(--text-3)', fontSize: '14px',
      }}>
        <span className="spinner" style={{ borderTopColor: 'var(--accent-light)', marginRight: '10px' }} />
        Loading...
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />
  return children
}