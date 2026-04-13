const CATEGORIES = [
  { key: 'all',        label: 'All',                color: '#6b7a8d' },
  { key: 'social',     label: 'Social / Atmosphere', color: '#378ADD' },
  { key: 'food',       label: 'Food & Drink',        color: '#D85A30' },
  { key: 'premium',    label: 'Premium Experience',  color: '#7F77DD' },
  { key: 'family',     label: 'Family',              color: '#1D9E75' },
  { key: 'history',    label: 'History & Art',       color: '#D4537E' },
  { key: 'innovation', label: 'Innovation',          color: '#BA7517' },
]

export default function CategoryFilter({ activeCategory, onCategoryChange }) {
  return (
    <aside className="category-sidebar">
      <div className="sidebar-label">Category</div>
      {CATEGORIES.map(({ key, label, color }) => (
        <button
          key={key}
          className={`cat-btn ${activeCategory === key ? 'active' : ''}`}
          style={{ '--cat-color': color }}
          onClick={() => onCategoryChange(key)}
        >
          {key !== 'all' && (
            <span className="cat-swatch" style={{ background: color }} />
          )}
          {label}
        </button>
      ))}
    </aside>
  )
}
