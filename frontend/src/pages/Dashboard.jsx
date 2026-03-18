import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const modes = [
  {
    icon: '✍️',
    title: 'Descriptive',
    desc: 'Structured exam answers for 3–10 marks.',
    accent: 'var(--accent)',
    dim: 'var(--accent-dim)',
    badgeClass: 'badge-descriptive',
  },
  {
    icon: '🎯',
    title: 'Objective',
    desc: 'MCQs, True/False, and Fill-in-the-blank quizzes.',
    accent: 'var(--green)',
    dim: 'var(--green-dim)',
    badgeClass: 'badge-objective',
  },
  {
    icon: '🎤',
    title: 'Seminar',
    desc: 'Full seminar scripts with Q&A preparation.',
    accent: 'var(--amber)',
    dim: 'var(--amber-dim)',
    badgeClass: 'badge-seminar',
  },
]

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 24px', width: '100%' }}>

      {/* Welcome bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '16px', marginBottom: '40px',
      }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '4px' }}>
            Good to see you, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-2)' }}>
            What would you like to prepare today?
          </p>
        </div>
        <Link to="/generate" className="btn btn-primary">
          + New Generation
        </Link>
      </div>

      {/* Modes */}
      <p style={{ fontSize: '11px', fontWeight: '600', color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '14px' }}>
        Available Modes
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '14px',
        marginBottom: '40px',
      }}>
        {modes.map((m) => (
          <Link to="/generate" key={m.title} style={{ textDecoration: 'none' }}>
            <div
              className="card"
              style={{ cursor: 'pointer', transition: 'border-color 0.15s, transform 0.15s', display: 'flex', flexDirection: 'column', gap: '14px' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = m.accent; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: 'var(--radius)',
                  background: m.dim, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px',
                }}>
                  {m.icon}
                </div>
                <span className={`badge ${m.badgeClass}`}>{m.title}</span>
              </div>
              <div>
                <p style={{ fontSize: '14px', color: 'var(--text-2)', lineHeight: '1.6' }}>{m.desc}</p>
              </div>
              <p style={{ fontSize: '13px', color: m.accent, fontWeight: '600' }}>Open →</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick links */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <Link to="/history" className="btn btn-ghost">View History</Link>
      </div>
    </div>
  )
}