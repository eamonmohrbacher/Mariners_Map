const CATEGORY_COLORS = {
  social:     '#378ADD',
  food:       '#D85A30',
  premium:    '#7F77DD',
  family:     '#1D9E75',
  history:    '#D4537E',
  innovation: '#BA7517',
}

const CATEGORY_LABELS = {
  social:     'Social',
  food:       'Food & Drink',
  premium:    'Premium',
  family:     'Family',
  history:    'History & Art',
  innovation: 'Innovation',
}

export default function ZoneTooltip({ zone, pos }) {
  if (!zone || !pos) return null

  const PAD = 14
  const TIP_W = 220
  const MARGIN = 12

  let left = pos.x + PAD
  let top  = pos.y - 40

  if (left + TIP_W > window.innerWidth - MARGIN) left = pos.x - TIP_W - PAD
  if (top < MARGIN) top = MARGIN

  const primaryColor = CATEGORY_COLORS[zone.categories[0]] || '#888'

  return (
    <div className="zone-tooltip" style={{ left, top }}>
      <div className="tooltip-accent" style={{ background: primaryColor }} />
      <div className="tooltip-body">
        <div className="tooltip-name">{zone.name}</div>
        <div className="tooltip-location">{zone.location}</div>
        <div className="tooltip-cats">
          {zone.categories.map(cat => (
            <span key={cat} className="tooltip-cat" style={{ color: CATEGORY_COLORS[cat] }}>
              {CATEGORY_LABELS[cat]}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
