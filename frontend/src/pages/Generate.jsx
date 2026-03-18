import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios.js'

const MODES = ['Descriptive', 'Objective', 'Seminar']

const defaultForms = {
  Descriptive: { topic: '', subject: '', marks: '7', format: 'theory', style: 'formal' },
  Objective: { topic: '', subject: '', count: '5', difficulty: 'Medium', type: 'MCQ' },
  Seminar: { topic: '', subject: '', duration: '10', audience: 'Engineering students', includeQA: true },
}

export default function Generate() {
  const [activeMode, setActiveMode] = useState('Descriptive')
  const [forms, setForms] = useState(defaultForms)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const f = forms[activeMode]

  const updateField = (name, value) => {
    setForms(prev => ({ ...prev, [activeMode]: { ...prev[activeMode], [name]: value } }))
    setError('')
  }

  const handleGenerate = async () => {
    if (!f.topic.trim() || !f.subject.trim()) {
      setError('Topic and Subject are required.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const endpoint = `/api/generate/${activeMode.toLowerCase()}`
      const payload = { ...f }
      if (activeMode === 'Descriptive') payload.marks = Number(payload.marks)
      if (activeMode === 'Objective') payload.count = Number(payload.count)
      if (activeMode === 'Seminar') payload.duration = Number(payload.duration)
      const res = await api.post(endpoint, payload)
      navigate(`/result/${res.data.contentId}`)
    } catch (err) {
      setError(err.response?.data?.error || 'Generation failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '40px 24px', width: '100%' }}>

      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '4px' }}>
          Generate Content
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-2)' }}>
          Select a mode and fill in the details.
        </p>
      </div>

      {/* Mode tabs */}
      <div style={{
        display: 'flex', gap: '4px',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: '4px',
        marginBottom: '24px',
      }}>
        {MODES.map(mode => (
          <button
            key={mode}
            onClick={() => { setActiveMode(mode); setError('') }}
            style={{
              flex: 1, padding: '8px',
              border: 'none', borderRadius: '6px',
              fontSize: '13px', fontWeight: '600',
              cursor: 'pointer', transition: 'all 0.15s',
              background: activeMode === mode ? 'var(--accent)' : 'transparent',
              color: activeMode === mode ? '#fff' : 'var(--text-2)',
            }}
          >
            {mode}
          </button>
        ))}
      </div>

      {/* Form card */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {error && <div className="error-box">{error}</div>}

        {/* Common fields */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <div className="field">
            <label className="label">Topic</label>
            <input className="input" placeholder="e.g. OSI Model"
              value={f.topic} onChange={e => updateField('topic', e.target.value)} />
          </div>
          <div className="field">
            <label className="label">Subject</label>
            <input className="input" placeholder="e.g. Computer Networks"
              value={f.subject} onChange={e => updateField('subject', e.target.value)} />
          </div>
        </div>

        {/* Descriptive specific */}
        {activeMode === 'Descriptive' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
            <div className="field">
              <label className="label">Marks</label>
              <select className="input" value={f.marks} onChange={e => updateField('marks', e.target.value)}>
                <option value="3">3 Marks</option>
                <option value="5">5 Marks</option>
                <option value="7">7 Marks</option>
                <option value="10">10 Marks</option>
              </select>
            </div>
            <div className="field">
              <label className="label">Format</label>
              <select className="input" value={f.format} onChange={e => updateField('format', e.target.value)}>
                <option value="theory">Theory</option>
                <option value="diagram included">Diagram Included</option>
                <option value="comparison">Comparison</option>
                <option value="example based">Example Based</option>
              </select>
            </div>
            <div className="field">
              <label className="label">Style</label>
              <select className="input" value={f.style} onChange={e => updateField('style', e.target.value)}>
                <option value="formal">Formal</option>
                <option value="simplified">Simplified</option>
                <option value="detailed">Detailed</option>
              </select>
            </div>
          </div>
        )}

        {/* Objective specific */}
        {activeMode === 'Objective' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
            <div className="field">
              <label className="label">Questions</label>
              <input className="input" type="number" min="1" max="30"
                value={f.count} onChange={e => updateField('count', e.target.value)} />
            </div>
            <div className="field">
              <label className="label">Difficulty</label>
              <select className="input" value={f.difficulty} onChange={e => updateField('difficulty', e.target.value)}>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            <div className="field">
              <label className="label">Type</label>
              <select className="input" value={f.type} onChange={e => updateField('type', e.target.value)}>
                <option value="MCQ">MCQ</option>
                <option value="TF">True / False</option>
                <option value="Fill">Fill in Blank</option>
              </select>
            </div>
          </div>
        )}

        {/* Seminar specific */}
        {activeMode === 'Seminar' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div className="field">
                <label className="label">Duration</label>
                <select className="input" value={f.duration} onChange={e => updateField('duration', e.target.value)}>
                  <option value="5">5 minutes</option>
                  <option value="10">10 minutes</option>
                  <option value="15">15 minutes</option>
                  <option value="20">20 minutes</option>
                  <option value="30">30 minutes</option>
                </select>
              </div>
              <div className="field">
                <label className="label">Audience</label>
                <input className="input" placeholder="e.g. Engineering students"
                  value={f.audience} onChange={e => updateField('audience', e.target.value)} />
              </div>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '9px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={f.includeQA}
                onChange={e => updateField('includeQA', e.target.checked)}
                style={{ width: '15px', height: '15px', accentColor: 'var(--accent)', cursor: 'pointer' }}
              />
              <span style={{ fontSize: '13px', color: 'var(--text-2)' }}>
                Include Q&A preparation section
              </span>
            </label>
          </div>
        )}

        <button
          className="btn btn-primary"
          onClick={handleGenerate}
          disabled={loading}
          style={{ width: '100%', padding: '11px', fontSize: '14px', marginTop: '4px' }}
        >
          {loading
            ? <><span className="spinner" />Generating with AI...</>
            : `Generate ${activeMode} Content →`
          }
        </button>
      </div>
    </div>
  )
}