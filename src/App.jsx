import { useState, useEffect } from 'react'
import zones from './data/zones.json'
import LevelFilter from './components/LevelFilter'
import ZoneLegend from './components/ZoneLegend'
import ParkMap from './components/ParkMap'
import ZonePanel from './components/ZonePanel'
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
  const [activeLevel, setActiveLevel] = useState('all')

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') setSelectedZone(null)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  const visibleZones = activeLevel === 'all'
    ? zones
    : zones.filter(z => z.level === activeLevel)

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
        <div className="map-container">
          <LevelFilter
            levels={LEVELS}
            activeLevel={activeLevel}
            onLevelChange={setActiveLevel}
          />
          <ParkMap
            zones={zones}
            activeLevel={activeLevel}
            selectedZone={selectedZone}
            onZoneClick={setSelectedZone}
          />
          <ZoneLegend />
        </div>
      </main>

      <div
        className={`panel-overlay ${selectedZone ? 'visible' : ''}`}
        onClick={() => setSelectedZone(null)}
      />
      <ZonePanel zone={selectedZone} onClose={() => setSelectedZone(null)} />
    </div>
  )
}
