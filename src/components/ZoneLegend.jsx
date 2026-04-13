const CATEGORIES = [
  { key: 'social',     label: 'Social / Atmosphere', color: '#378ADD' },
  { key: 'food',       label: 'Food & Drink',        color: '#D85A30' },
  { key: 'premium',    label: 'Premium Experience',  color: '#7F77DD' },
  { key: 'family',     label: 'Family',              color: '#1D9E75' },
  { key: 'history',    label: 'History & Art',       color: '#D4537E' },
  { key: 'innovation', label: 'Innovation',          color: '#BA7517' },
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
