import React, { useEffect, useMemo, useState } from 'react'
import Game from './components/Game'
import { LEVELS, TOTAL_LEVELS } from './data/levels'

function useLocalStorage<T>(key: string, initial: T) {
  const [state, setState] = useState<T>(() => {
    try {
      const v = localStorage.getItem(key)
      return v ? (JSON.parse(v) as T) : initial
    } catch {
      return initial
    }
  })
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(state)) } catch {}
  }, [key, state])
  return [state, setState] as const
}

export default function App() {
  const [unlockedMax, setUnlockedMax] = useLocalStorage<number>('unlockedMax', 0)
  const [view, setView] = useState<'menu' | 'play'>('menu')
  const [activeLevel, setActiveLevel] = useState<number | null>(null)

  const levels = useMemo(() => LEVELS, [])

  const startLevel = (n: number) => {
    setActiveLevel(n)
    setView('play')
  }

  const handleLevelFinished = (level: number, passed: boolean) => {
    if (passed && level >= unlockedMax && level < TOTAL_LEVELS - 1) {
      setUnlockedMax(level + 1)
    }
    setView('menu')
    setActiveLevel(null)
  }

  return (
    <div className="container">
      {view === 'menu' && (
        <div className="card">
          <div className="header">
            <div>
              <h1>Sanskrit Vocab Game</h1>
              <div className="sub">Learn 11 levels × 50 Sanskrit words each. Pass with ≥80% to unlock the next.</div>
            </div>
            <div className="badge ok">Unlocked up to: L{unlockedMax}</div>
          </div>
          <div className="levels">
            {levels.map((lvl, i) => (
              <button
                key={i}
                className="level-button"
                disabled={i > unlockedMax}
                onClick={() => startLevel(i)}
                title={`${lvl.title}`}
              >
                <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>Level {i}</div>
                <div className="sub">{lvl.title}</div>
                <div className="sub">{lvl.items.length} words</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {view === 'play' && activeLevel !== null && (
        <Game
          levelIndex={activeLevel}
          level={levels[activeLevel]}
          onExit={(passed) => handleLevelFinished(activeLevel, passed)}
        />
      )}
    </div>
  )
}

