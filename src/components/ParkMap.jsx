import ZonePin from './ZonePin'

// All zones ordered so numbers are stable
const LEVEL_ORDER = ['exterior', 'main', 'club', 'suite', 'view']

function getZoneIndex(zone, allZones) {
  // Sort by level then by id for stable numbering
  const sorted = [...allZones].sort((a, b) => {
    const li = LEVEL_ORDER.indexOf(a.level)
    const lj = LEVEL_ORDER.indexOf(b.level)
    return li !== lj ? li - lj : a.id.localeCompare(b.id)
  })
  return sorted.findIndex(z => z.id === zone.id)
}

export default function ParkMap({ zones, activeLevel, selectedZone, onZoneClick }) {
  return (
    <div className="park-map-wrap">
      <svg
        className="park-map-svg"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ── Stadium outer shell ── */}
        <rect x="0" y="0" width="100" height="100" fill="#0a1628" rx="4" />

        {/* Concourse ring */}
        <path
          d="M 50,98 L 5,98 L 5,10 L 50,2 L 95,10 L 95,98 Z"
          fill="#14244a"
        />

        {/* ── Playing field ── */}
        {/* Outfield grass */}
        <path
          d="M 50,85 L 12,46 Q 10,20 50,8 Q 90,20 88,46 Z"
          fill="#2d7a28"
        />

        {/* Warning track arc */}
        <path
          d="M 50,85 L 15,49 Q 13,22 50,11 Q 87,22 85,49 Z"
          fill="#b8956a"
        />

        {/* Fair territory grass (inside warning track) */}
        <path
          d="M 50,85 L 18,52 Q 16,26 50,14 Q 84,26 82,52 Z"
          fill="#2d7a28"
        />

        {/* Foul territory / infield dirt color base */}
        <ellipse cx="50" cy="74" rx="20" ry="16" fill="#c8a96e" />

        {/* Infield grass diamond */}
        <polygon
          points="50,85 59,74 50,63 41,74"
          fill="#2d7a28"
        />

        {/* Dirt infield (skin around diamond) */}
        <ellipse cx="50" cy="74" rx="13" ry="11" fill="#c8a96e" />

        {/* Inner diamond grass */}
        <polygon
          points="50,82 57,74 50,66 43,74"
          fill="#2d7a28"
        />

        {/* Pitcher's mound */}
        <circle cx="50" cy="74" r="1.5" fill="#b8956a" />

        {/* Base paths */}
        <polyline
          points="50,85 59,74 50,63 41,74 50,85"
          fill="none"
          stroke="#e8d5a3"
          strokeWidth="0.5"
        />

        {/* Bases */}
        <rect x="48.5" y="83.5" width="3" height="3" fill="white" transform="rotate(45,50,85)" />
        <rect x="57.5" y="72.5" width="3" height="3" fill="white" transform="rotate(45,59,74)" />
        <rect x="48.5" y="61.5" width="3" height="3" fill="white" transform="rotate(45,50,63)" />
        <rect x="39.5" y="72.5" width="3" height="3" fill="white" transform="rotate(45,41,74)" />

        {/* Foul lines */}
        <line x1="50" y1="85" x2="12" y2="46" stroke="white" strokeWidth="0.3" opacity="0.5" />
        <line x1="50" y1="85" x2="88" y2="46" stroke="white" strokeWidth="0.3" opacity="0.5" />

        {/* ── Direction labels ── */}
        <text x="50" y="6.5" textAnchor="middle" fontSize="2.4" fill="#8aa4c8" fontWeight="600" letterSpacing="0.3">
          CENTER FIELD
        </text>
        <text x="14" y="38" textAnchor="middle" fontSize="2" fill="#8aa4c8" transform="rotate(-45,14,38)">
          LEFT FIELD
        </text>
        <text x="86" y="38" textAnchor="middle" fontSize="2" fill="#8aa4c8" transform="rotate(45,86,38)">
          RIGHT FIELD
        </text>

        {/* Home plate label */}
        <text x="50" y="94" textAnchor="middle" fontSize="1.8" fill="#8aa4c8">
          HOME PLATE
        </text>

        {/* ── Zone pins ── */}
        {zones.map((zone) => {
          const dimmed = activeLevel !== 'all' && zone.level !== activeLevel
          const selected = selectedZone?.id === zone.id
          const index = getZoneIndex(zone, zones)
          return (
            <ZonePin
              key={zone.id}
              zone={zone}
              index={index}
              dimmed={dimmed}
              selected={selected}
              onClick={onZoneClick}
            />
          )
        })}
      </svg>
    </div>
  )
}
