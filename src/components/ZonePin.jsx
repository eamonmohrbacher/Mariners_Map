const CATEGORY_COLORS = {
  family:        '#1D9E75',
  social:        '#378ADD',
  dedicated:     '#D4537E',
  corporate:     '#7F77DD',
  tourist:       '#BA7517',
  accessibility: '#D85A30',
}

export default function ZonePin({ zone, index, dimmed, selected, activeCategory, onClick, onHover, onHoverEnd }) {
  const { coordinates, categories, id } = zone
  const r = 3.2

  // When a specific group is active, show that group's solid color.
  // When "all" is selected, show split colors for multi-group zones.
  const showSplit = activeCategory === 'all' && categories.length > 1
  const color1 = showSplit ? (CATEGORY_COLORS[categories[0]] || '#888') : (CATEGORY_COLORS[activeCategory] || CATEGORY_COLORS[categories[0]] || '#888')
  const color2 = showSplit ? (CATEGORY_COLORS[categories[1]] || '#888') : null
  const gradId = `pin-grad-${id}`

  const classNames = [
    'zone-pin',
    dimmed   ? 'dimmed'   : '',
    selected ? 'selected' : '',
  ].filter(Boolean).join(' ')

  return (
    <g transform={`translate(${coordinates.x}, ${coordinates.y})`}>
      {color2 && (
        <defs>
          <linearGradient id={gradId} x1="0" x2="1" y1="0" y2="0">
            <stop offset="50%" stopColor={color1} />
            <stop offset="50%" stopColor={color2} />
          </linearGradient>
        </defs>
      )}
      <g
        className={classNames}
        onClick={(e) => !dimmed && onClick(zone, e)}
        onMouseEnter={(e) => !dimmed && onHover?.(zone, e)}
        onMouseLeave={() => onHoverEnd?.()}
        role="button"
        aria-label={zone.name}
      >
        <circle
          className="pin-circle"
          r={r}
          fill={color2 ? `url(#${gradId})` : color1}
          stroke={selected ? 'white' : 'rgba(0,0,0,0.25)'}
          strokeWidth={selected ? 0.8 : 0.4}
        />
        <text className="pin-number" fontSize={2.2} fill="white">
          {index + 1}
        </text>
      </g>
    </g>
  )
}
