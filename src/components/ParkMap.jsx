import ZonePin from './ZonePin'

const LEVEL_ORDER = ['exterior', 'main', 'club', 'suite', 'view']

function getZoneIndex(zone, allZones) {
  const sorted = [...allZones].sort((a, b) => {
    const li = LEVEL_ORDER.indexOf(a.level)
    const lj = LEVEL_ORDER.indexOf(b.level)
    return li !== lj ? li - lj : a.id.localeCompare(b.id)
  })
  return sorted.findIndex(z => z.id === zone.id)
}

export default function ParkMap({ zones, activeLevel, activeCategory, selectedZone, onZoneClick, onZoneHover, onZoneHoverEnd }) {
  return (
    <div className="park-map-wrap">
      <svg
        className="park-map-svg"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ── Outer stadium shell ── */}
        <rect x="0" y="0" width="100" height="100" fill="#0a1628" rx="4" />

        {/* Concourse / seating bowl — fills most of the SVG */}
        <path d="M 50,98 L 4,98 L 4,6 L 50,2 L 96,6 L 96,98 Z" fill="#14244a" />

        {/* Inner seating bowl ring — slightly lighter to suggest tiered stands */}
        <path d="M 50,95 L 9,95 L 9,12 L 50,6 L 91,12 L 91,95 Z" fill="#162d52" />

        {/* ── Playing field (significantly smaller — stands are clearly outside) ── */}

        {/* Outfield grass — warning track outline */}
        <path
          d="M 50,76 L 24,50 Q 24,30 50,28 Q 76,30 76,50 Z"
          fill="#b8956a"
        />

        {/* Outfield grass — fair territory */}
        <path
          d="M 50,76 L 27,51 Q 27,33 50,31 Q 73,33 73,51 Z"
          fill="#2d7a28"
        />

        {/* Foul territory dirt around infield */}
        <ellipse cx="50" cy="66" rx="14" ry="11" fill="#c8a96e" />

        {/* Infield grass */}
        <polygon points="50,76 58,66 50,56 42,66" fill="#2d7a28" />

        {/* Inner dirt / skinned infield */}
        <ellipse cx="50" cy="66" rx="9" ry="7.5" fill="#c8a96e" />

        {/* Inner diamond grass */}
        <polygon points="50,73 56,66 50,59 44,66" fill="#2d7a28" />

        {/* Pitcher's mound */}
        <circle cx="50" cy="66" r="1.2" fill="#b8956a" />

        {/* Base paths */}
        <polyline
          points="50,76 58,66 50,56 42,66 50,76"
          fill="none"
          stroke="#e8d5a3"
          strokeWidth="0.4"
        />

        {/* Bases */}
        <rect x="48.7" y="74.7" width="2.6" height="2.6" fill="white" transform="rotate(45,50,76)" />
        <rect x="56.7" y="64.7" width="2.6" height="2.6" fill="white" transform="rotate(45,58,66)" />
        <rect x="48.7" y="54.7" width="2.6" height="2.6" fill="white" transform="rotate(45,50,56)" />
        <rect x="40.7" y="64.7" width="2.6" height="2.6" fill="white" transform="rotate(45,42,66)" />

        {/* Foul lines */}
        <line x1="50" y1="76" x2="24" y2="50" stroke="white" strokeWidth="0.3" opacity="0.6" />
        <line x1="50" y1="76" x2="76" y2="50" stroke="white" strokeWidth="0.3" opacity="0.6" />

        {/* ── Mariners compass logo on the outfield grass ── */}
        <g transform="translate(50, 42)" opacity="0.22">
          {/* Outer ring */}
          <circle r="7.5" fill="none" stroke="#0C2C56" strokeWidth="0.6" />
          {/* Inner ring */}
          <circle r="4.5" fill="none" stroke="#0C2C56" strokeWidth="0.4" />
          {/* North point (toward center field / top) */}
          <polygon points="0,-7.5 1.4,-3 0,-5 -1.4,-3" fill="#0C2C56" />
          {/* South point */}
          <polygon points="0,7.5 1.4,3 0,5 -1.4,3" fill="#0C2C56" />
          {/* East point */}
          <polygon points="7.5,0 3,1.4 5,0 3,-1.4" fill="#0C2C56" />
          {/* West point */}
          <polygon points="-7.5,0 -3,1.4 -5,0 -3,-1.4" fill="#0C2C56" />
          {/* Diagonal NE */}
          <polygon points="5.3,5.3 2.5,2 3.8,3.8 2,2.5" fill="#0C2C56" />
          {/* Diagonal NW */}
          <polygon points="-5.3,5.3 -2,2.5 -3.8,3.8 -2.5,2" fill="#0C2C56" />
          {/* Diagonal SE */}
          <polygon points="5.3,-5.3 2,-2.5 3.8,-3.8 2.5,-2" fill="#0C2C56" />
          {/* Diagonal SW */}
          <polygon points="-5.3,-5.3 -2.5,-2 -3.8,-3.8 -2,-2.5" fill="#0C2C56" />
          {/* Center dot */}
          <circle r="1.4" fill="#0C2C56" />
        </g>

        {/* MARINERS text on outfield grass */}
        <text
          x="50" y="37"
          textAnchor="middle"
          fontSize="2.8"
          fill="rgba(12,44,86,0.25)"
          fontWeight="900"
          letterSpacing="1.2"
        >
          MARINERS
        </text>

        {/* ── Direction labels (in stands) ── */}
        <text x="50" y="5" textAnchor="middle" fontSize="2.2" fill="#8aa4c8" fontWeight="600" letterSpacing="0.3">
          CENTER FIELD
        </text>
        <text x="9" y="44" textAnchor="middle" fontSize="1.8" fill="#8aa4c8" transform="rotate(-50,9,44)">
          LEFT FIELD
        </text>
        <text x="91" y="44" textAnchor="middle" fontSize="1.8" fill="#8aa4c8" transform="rotate(50,91,44)">
          RIGHT FIELD
        </text>
        <text x="50" y="96" textAnchor="middle" fontSize="1.8" fill="#8aa4c8">
          HOME PLATE
        </text>

        {/* ── Zone pins ── */}
        {zones.map((zone) => {
          const dimmed = (activeLevel !== 'all' && zone.level !== activeLevel) ||
                        (activeCategory !== 'all' && !zone.categories.includes(activeCategory))
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
              onHover={onZoneHover}
              onHoverEnd={onZoneHoverEnd}
            />
          )
        })}
      </svg>
    </div>
  )
}
