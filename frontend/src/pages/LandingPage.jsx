import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const features = [
  {
    icon: '✍️',
    title: 'Descriptive Mode',
    desc: 'Generate structured 3, 5, 7 and 10 mark exam answers tailored by format and writing style.',
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

const steps = [
  { number: '01', title: 'Choose a mode', desc: 'Pick Descriptive, Objective, or Seminar based on what you need.' },
  { number: '02', title: 'Fill in details', desc: 'Enter your topic, subject, and preferences for the output.' },
  { number: '03', title: 'Get AI output', desc: 'Gemini AI generates exam-ready content in seconds.' },
  { number: '04', title: 'Export or save', desc: 'Copy to clipboard or export as PDF for offline use.' },
]

export default function LandingPage() {
  const { user } = useAuth()

  return (
    <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

      {/* Hero */}
      <section style={{
        maxWidth: '860px', margin: '0 auto',
        padding: '96px 24px 80px', textAlign: 'center', width: '100%',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          background: 'var(--accent-dim)', border: '1px solid var(--accent-border)',
          borderRadius: '20px', padding: '4px 14px',
          fontSize: '11px', fontWeight: '700', color: 'var(--accent-light)',
          letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '32px',
        }}>
          ✦ Powered by Gemini AI
        </div>

        <h1 style={{
          fontSize: 'clamp(34px, 5vw, 56px)',
          fontWeight: '800', lineHeight: '1.1',
          letterSpacing: '-0.03em', color: 'var(--text-1)', marginBottom: '20px',
        }}>
          Study preparation,<br />
          <span style={{
            background: 'linear-gradient(135deg, var(--accent-light) 0%, var(--accent) 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            intelligently done.
          </span>
        </h1>

        <p style={{
          fontSize: '16px', color: 'var(--text-2)',
          maxWidth: '460px', margin: '0 auto 40px', lineHeight: '1.75',
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
        maxWidth: '960px', margin: '0 auto',
        padding: '0 24px 80px', width: '100%',
      }}>
        <p style={{
          fontSize: '11px', fontWeight: '700', color: 'var(--text-3)',
          letterSpacing: '0.08em', textTransform: 'uppercase',
          textAlign: 'center', marginBottom: '20px',
        }}>
          Three Modes. One Platform.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '14px',
        }}>
          {features.map((f) => (
            <div key={f.title} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '22px' }}>{f.icon}</span>
                <span className={`badge ${f.badgeClass}`}>{f.badge}</span>
              </div>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '6px' }}>{f.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-2)', lineHeight: '1.65' }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{
        borderTop: '1px solid var(--border)',
        background: 'var(--surface)',
        padding: '72px 24px',
      }}>
        <div style={{ maxWidth: '860px', margin: '0 auto', width: '100%' }}>
          <p style={{
            fontSize: '11px', fontWeight: '700', color: 'var(--text-3)',
            letterSpacing: '0.08em', textTransform: 'uppercase',
            textAlign: 'center', marginBottom: '8px',
          }}>
            How It Works
          </p>
          <h2 style={{
            fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: '700',
            letterSpacing: '-0.02em', textAlign: 'center',
            marginBottom: '48px', color: 'var(--text-1)',
          }}>
            From topic to exam-ready in 4 steps
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '24px',
          }}>
            {steps.map((s) => (
              <div key={s.number} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <span style={{
                  fontSize: '12px', fontWeight: '800',
                  color: 'var(--accent)', letterSpacing: '0.04em',
                }}>
                  {s.number}
                </span>
                <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-1)' }}>{s.title}</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-2)', lineHeight: '1.6' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      {!user && (
        <section style={{
          padding: '80px 24px',
          textAlign: 'center',
        }}>
          <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: '800',
              letterSpacing: '-0.02em', marginBottom: '14px', color: 'var(--text-1)',
            }}>
              Ready to prepare smarter?
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--text-2)', marginBottom: '28px', lineHeight: '1.7' }}>
              Join students already using PrepWise to ace their exams.
            </p>
            <Link to="/register" className="btn btn-primary" style={{ padding: '12px 32px', fontSize: '15px' }}>
              Create Free Account →
            </Link>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer style={{
        marginTop: 'auto',
        borderTop: '1px solid var(--border)',
        padding: '20px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '10px',
      }}>
        <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-2)' }}>PrepWise</span>
        <span style={{ fontSize: '12px', color: 'var(--text-3)' }}>
          © 2025 — Built for Indian university students
        </span>
        <span style={{ fontSize: '12px', color: 'var(--text-3)' }}>
          Powered by Gemini AI
        </span>
      </footer>
    </main>
  )
}