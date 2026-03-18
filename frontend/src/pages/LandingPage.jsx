import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const features = [
  {
    icon: '✍️',
    title: 'Descriptive Mode',
    desc: 'Generate structured 3, 5, 7 and 10 mark exam answers, tailored by format and writing style.',
    badge: 'DESCRIPTIVE',
    badgeClass: 'badge-descriptive',
  },
  {
    icon: '🎯',
    title: 'Objective Mode',
    desc: 'Create MCQs, True/False, and Fill-in-the-blank quizzes with answers and explanations.',
    badge: 'OBJECTIVE',
    badgeClass: 'badge-objective',
  },
  {
    icon: '🎤',
    title: 'Seminar Mode',
    desc: 'Get full seminar scripts with speaker cues, structured sections, and Q&A preparation.',
    badge: 'SEMINAR',
    badgeClass: 'badge-seminar',
  },
]

export default function LandingPage() {
  const { user } = useAuth()

  return (
    <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      {/* Hero */}
      <section style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '96px 24px 72px',
        textAlign: 'center',
        width: '100%',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          background: 'var(--accent-dim)',
          border: '1px solid var(--accent-border)',
          borderRadius: '20px',
          padding: '4px 14px',
          fontSize: '12px', fontWeight: '600',
          color: 'var(--accent-light)',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          marginBottom: '32px',
        }}>
          Powered by Gemini AI
        </div>

        <h1 style={{
          fontSize: 'clamp(36px, 5.5vw, 58px)',
          fontWeight: '800',
          lineHeight: '1.1',
          letterSpacing: '-0.03em',
          color: 'var(--text-1)',
          marginBottom: '20px',
        }}>
          Study preparation,<br />
          <span style={{
            background: 'linear-gradient(135deg, var(--accent-light) 0%, var(--accent) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            intelligently done.
          </span>
        </h1>

        <p style={{
          fontSize: '16px',
          color: 'var(--text-2)',
          maxWidth: '480px',
          margin: '0 auto 40px',
          lineHeight: '1.75',
        }}>
          PrepWise generates exam-ready answers, quizzes, and seminar scripts
          for Indian university students — in seconds.
        </p>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {user ? (
            <Link to="/generate" className="btn btn-primary" style={{ padding: '11px 26px', fontSize: '15px' }}>
              Start Generating →
            </Link>
          ) : (
            <>
              <Link to="/register" className="btn btn-primary" style={{ padding: '11px 26px', fontSize: '15px' }}>
                Get Started Free →
              </Link>
              <Link to="/login" className="btn btn-ghost" style={{ padding: '11px 22px', fontSize: '15px' }}>
                Login
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Features */}
      <section style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '0 24px 96px',
        width: '100%',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '16px',
        }}>
          {features.map((f) => (
            <div key={f.title} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '24px' }}>{f.icon}</span>
                <span className={`badge ${f.badgeClass}`}>{f.badge}</span>
              </div>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '6px', color: 'var(--text-1)' }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-2)', lineHeight: '1.65' }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '18px 24px',
        textAlign: 'center',
        fontSize: '12px',
        color: 'var(--text-3)',
      }}>
        PrepWise © 2025 — Built for Indian university students
      </footer>
    </main>
  )
}