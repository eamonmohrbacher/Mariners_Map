const CATEGORIES = [
  { key: 'all',           label: 'All',                                    color: '#6b7a8d' },
  { key: 'family',        label: 'Families with Young Children',           color: '#1D9E75' },
  { key: 'social',        label: 'Young Adults & Social Groups',           color: '#378ADD' },
  { key: 'dedicated',     label: 'Dedicated Fans & Season Ticket Holders', color: '#D4537E' },
  { key: 'corporate',     label: 'Corporate & Business Groups',            color: '#7F77DD' },
  { key: 'tourist',       label: 'Tourists & First-Time Fans',             color: '#BA7517' },
  { key: 'accessibility', label: 'Accessibility & Multigenerational',      color: '#D85A30' },
]

export default function CategoryFilter({ activeCategories, onCategoryChange }) {
  const isAll = activeCategories.length === 0

  return (
    <aside className="category-sidebar">
      <div className="sidebar-label">Category</div>
      {CATEGORIES.map(({ key, label, color }) => {
        const isActive = key === 'all' ? isAll : activeCategories.includes(key)
        return (
          <button
            key={key}
            className={`cat-btn ${isActive ? 'active' : ''}`}
            style={{ '--cat-color': color }}
            onClick={() => onCategoryChange(key)}
          >
            {key !== 'all' && (
              <span className="cat-swatch" style={{ background: color }} />
            )}
            {label}
          </button>
        )
      })}
    </aside>
  )
}
