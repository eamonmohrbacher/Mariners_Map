const CATEGORY_COLORS = {
  social:     '#378ADD',
  food:       '#D85A30',
  premium:    '#7F77DD',
  family:     '#1D9E75',
  history:    '#D4537E',
  innovation: '#BA7517',
}

export default function ZonePin({ zone, index, dimmed, selected, onClick }) {
  const { coordinates, categories } = zone
  const color = CATEGORY_COLORS[categories[0]] || '#888'
  const r = 3.2

  const classNames = [
    'zone-pin',
    dimmed ? 'dimmed' : '',
    selected ? 'selected' : '',
  ].filter(Boolean).join(' ')

  return (
    <g
      className={classNames}
      transform={`translate(${coordinates.x}, ${coordinates.y})`}
      onClick={(e) => !dimmed && onClick(zone, e)}
      role="button"
      aria-label={zone.name}
    >
      <circle
        className="pin-circle"
        r={r}
        fill={color}
        stroke={selected ? 'white' : 'rgba(0,0,0,0.25)'}
        strokeWidth={selected ? 0.8 : 0.4}
      />
      <text
        className="pin-number"
        fontSize={selected ? 2.4 : 2.2}
        fill="white"
      >
        {index + 1}
      </text>
    </g>
  )
}
