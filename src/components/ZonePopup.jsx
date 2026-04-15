import { useEffect, useRef } from 'react'
import MetricCard from './MetricCard'
import ZONE_IMAGES from '../assets/zoneImages'

const LEVEL_LABELS = {
  exterior: 'Exterior',
  main:     'Main Level (100)',
  club:     'Club Level (200)',
  suite:    'Suite / Press',
  view:     'View Level (300)',
}

const CATEGORY_LABELS = {
  family:        'Families with Children',
  social:        'Young Adults & Social',
  dedicated:     'Dedicated Fans',
  corporate:     'Corporate & Business',
  tourist:       'Tourists & Casual Fans',
  accessibility: 'Accessibility & Multigenerational',
}

export default function ZonePopup({ zone, pos, onClose }) {
  const ref = useRef(null)

  // Close on outside click
  useEffect(() => {
    if (!zone) return
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose()
      }
    }
    // Delay so the opening click doesn't immediately close
    const t = setTimeout(() => document.addEventListener('mousedown', handler), 50)
    return () => { clearTimeout(t); document.removeEventListener('mousedown', handler) }
  }, [zone, onClose])

  if (!zone || !pos) return null

  // Smart positioning: keep popup inside viewport
  const POP_W = 300
  const POP_H = 360
  const PAD = 12
  const MARGIN = 16

  let left = pos.x + PAD
  let top  = pos.y - POP_H / 2

  if (left + POP_W > window.innerWidth - MARGIN)  left = pos.x - POP_W - PAD
  if (top < MARGIN)                                top = MARGIN
  if (top + POP_H > window.innerHeight - MARGIN)  top = window.innerHeight - POP_H - MARGIN

  const zoneImage = ZONE_IMAGES[zone.id]

  return (
    <div
      ref={ref}
      className="zone-popup"
      style={{ left, top }}
    >
      {zoneImage && (
        <img src={zoneImage} alt={zone.name} className="popup-image" />
      )}
      <div className="popup-header">
        <div className="popup-name">{zone.name}</div>
        <button className="popup-close" onClick={onClose} aria-label="Close">×</button>
      </div>

      <div className="popup-location">{zone.location}</div>

      <div className="popup-badges">
        <span className="badge-level">{LEVEL_LABELS[zone.level] || zone.level}</span>
        {zone.categories.map(cat => (
          <span key={cat} className="badge-cat">{CATEGORY_LABELS[cat] || cat}</span>
        ))}
      </div>

      {zone.summary && (
        <p className="popup-summary">{zone.summary}</p>
      )}

      {zone.keyMetrics?.length > 0 && (
        <div className="metrics-grid">
          {zone.keyMetrics.map((m, i) => (
            <MetricCard key={i} label={m.label} value={m.value} />
          ))}
        </div>
      )}
    </div>
  )
}
