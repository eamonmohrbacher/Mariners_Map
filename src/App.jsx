import { useState, useEffect } from 'react'
import zones from './data/zones.json'
import LevelFilter from './components/LevelFilter'
import CategoryFilter from './components/CategoryFilter'
import ZoneLegend from './components/ZoneLegend'
import ParkMap from './components/ParkMap'
import ZonePopup from './components/ZonePopup'
import './styles/app.css'

const LEVELS = [
  { key: 'all',      label: 'All Levels' },
  { key: 'exterior', label: 'Exterior' },
  { key: 'main',     label: 'Main (100)' },
  { key: 'club',     label: 'Club (200)' },
  { key: 'suite',    label: 'Suite / Press' },
  { key: 'view',     label: 'View (300)' },
]

export default function App() {
  const [selectedZone, setSelectedZone] = useState(null)
  const [popupPos, setPopupPos] = useState(null)
  const [activeLevel, setActiveLevel] = useState('all')
  const [activeCategory, setActiveCategory] = useState('all')

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') setSelectedZone(null)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  function handleZoneClick(zone, e) {
    if (selectedZone?.id === zone.id) {
      setSelectedZone(null)
      return
    }
    setSelectedZone(zone)
    setPopupPos({ x: e.clientX, y: e.clientY })
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-logo">⚾</div>
        <div className="header-titles">
          <h1>T-Mobile Park Zone Map</h1>
          <p>Seattle Mariners · Interactive Guide</p>
        </div>
      </header>

      <main className="app-main">
        <CategoryFilter
          activeCategory={activeCategory}
          onCategoryChange={(cat) => { setActiveCategory(cat); setSelectedZone(null) }}
        />

        <div className="map-container">
          <LevelFilter
            levels={LEVELS}
            activeLevel={activeLevel}
            onLevelChange={(lvl) => { setActiveLevel(lvl); setSelectedZone(null) }}
          />
          <ParkMap
            zones={zones}
            activeLevel={activeLevel}
            activeCategory={activeCategory}
            selectedZone={selectedZone}
            onZoneClick={handleZoneClick}
          />
          <ZoneLegend />
        </div>
      </main>

      <ZonePopup
        zone={selectedZone}
        pos={popupPos}
        onClose={() => setSelectedZone(null)}
      />
    </div>
  )
}
