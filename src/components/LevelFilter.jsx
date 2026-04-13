export default function LevelFilter({ levels, activeLevel, onLevelChange }) {
  return (
    <div className="level-filter">
      <span className="level-filter-label">Level</span>
      {levels.map(({ key, label }) => (
        <button
          key={key}
          className={`level-btn ${activeLevel === key ? 'active' : ''}`}
          onClick={() => onLevelChange(key)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
