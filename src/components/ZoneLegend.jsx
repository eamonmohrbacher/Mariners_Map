const CATEGORIES = [
  { key: 'family',        label: 'Families with Children',                 color: '#1D9E75' },
  { key: 'social',        label: 'Young Adults & Social Groups',           color: '#378ADD' },
  { key: 'dedicated',     label: 'Dedicated Fans & Season Ticket Holders', color: '#D4537E' },
  { key: 'corporate',     label: 'Corporate & Business Groups',            color: '#7F77DD' },
  { key: 'tourist',       label: 'Tourists & First-Time Fans',             color: '#BA7517' },
  { key: 'accessibility', label: 'Accessibility & Multigenerational',      color: '#D85A30' },
]

export default function ZoneLegend() {
  return (
    <div className="zone-legend">
      {CATEGORIES.map(({ key, label, color }) => (
        <div key={key} className="legend-item">
          <div className="legend-swatch" style={{ background: color }} />
          <span className="legend-label">{label}</span>
        </div>
      ))}
      <span className="legend-hint">Tap a level to filter · Tap any pin for details</span>
    </div>
  )
}
