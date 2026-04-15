import ZonePin from './ZonePin'
import stadiumImg from '../assets/Stadium.jpg'

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
        {/* ── Stadium photo background ── */}
        <image href={stadiumImg} x="0" y="0" width="100" height="100" preserveAspectRatio="xMidYMid slice" />

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
              activeCategory={activeCategory}
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
