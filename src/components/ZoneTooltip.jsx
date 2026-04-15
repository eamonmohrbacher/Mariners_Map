const CATEGORY_COLORS = {
  family:        '#1D9E75',
  social:        '#378ADD',
  dedicated:     '#D4537E',
  corporate:     '#7F77DD',
  tourist:       '#BA7517',
  accessibility: '#D85A30',
}

const CATEGORY_LABELS = {
  family:        'Families with Children',
  social:        'Young Adults & Social',
  dedicated:     'Dedicated Fans',
  corporate:     'Corporate & Business',
  tourist:       'Tourists & Casual Fans',
  accessibility: 'Accessibility & Multigenerational',
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
