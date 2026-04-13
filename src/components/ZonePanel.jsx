import ReactMarkdown from 'react-markdown'
import MetricCard from './MetricCard'

const LEVEL_LABELS = {
  exterior: 'Exterior',
  main:     'Main Level (100)',
  club:     'Club Level (200)',
  suite:    'Suite / Press',
  view:     'View Level (300)',
}

const CATEGORY_LABELS = {
  social:     'Social / Atmosphere',
  food:       'Food & Drink',
  premium:    'Premium Experience',
  family:     'Family',
  history:    'History & Art',
  innovation: 'Innovation',
}

export default function ZonePanel({ zone, onClose }) {
  const isPlaceholder = !zone?.research || zone.research.startsWith('STUDENT RESEARCH')

  return (
    <aside className={`zone-panel ${zone ? 'open' : ''}`}>
      {zone && (
        <>
          <div className="panel-header">
            <button className="panel-close" onClick={onClose} aria-label="Close">×</button>
            <div className="panel-zone-name">{zone.name}</div>
            <div className="panel-location">{zone.location}</div>
            <div className="panel-badges">
              <span className="badge-level">{LEVEL_LABELS[zone.level] || zone.level}</span>
              {zone.categories.map(cat => (
                <span key={cat} className="badge-cat">{CATEGORY_LABELS[cat] || cat}</span>
              ))}
            </div>
          </div>

          <div className="panel-body">
            {zone.summary && (
              <p className="panel-summary">{zone.summary}</p>
            )}

            {zone.keyMetrics?.length > 0 && (
              <div className="metrics-grid">
                {zone.keyMetrics.map((m, i) => (
                  <MetricCard key={i} label={m.label} value={m.value} />
                ))}
              </div>
            )}

            <div className="research-section">
              <div className="research-title">Student Research</div>
              {isPlaceholder ? (
                <p className="research-placeholder">
                  Student research notes will appear here once submitted.
                </p>
              ) : (
                <div className="research-content">
                  <ReactMarkdown>{zone.research}</ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </aside>
  )
}
