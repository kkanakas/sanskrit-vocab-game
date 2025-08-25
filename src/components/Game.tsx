import React, { useEffect, useMemo, useRef, useState } from 'react'
import type { Level, VocabItem } from '../data/levels'
import { useSpeech } from '../hooks/useSpeech'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function normalize(s: string) {
  return s.trim().toLowerCase()
    .replace(/[^a-z]/g, '')
}

type Props = {
  levelIndex: number
  level: Level
  onExit: (passed: boolean) => void
}

export default function Game({ levelIndex, level, onExit }: Props) {
  const { speak } = useSpeech()

  const [items] = useState<VocabItem[]>(() => {
    // Ensure no repeated words within a level even if source data has duplicates
    const seen = new Set<string>()
    const uniq = level.items.filter(it => {
      const key = `${(it.sa || '').toLowerCase()}|${(it.en || '').toLowerCase()}`
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
    return shuffle(uniq)
  })
  const [i, setI] = useState(0)
  const [input, setInput] = useState('')
  const [correct, setCorrect] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [history, setHistory] = useState<{ item: VocabItem; guess: string; ok: boolean }[]>([])
  const [finished, setFinished] = useState(false)
  const [feedback, setFeedback] = useState<{ ok: boolean; text: string } | null>(null)
  const feedbackTimer = useRef<number | null>(null)

  const current = items[i]
  const pct = attempts === 0 ? 0 : Math.round((correct / attempts) * 100)
  const progress = Math.round(((i) / items.length) * 100)

  useEffect(() => {
    // auto speak on each new word
    if (current?.sa) speak(current.sa)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i])

  useEffect(() => {
    return () => {
      if (feedbackTimer.current) window.clearTimeout(feedbackTimer.current)
    }
  }, [])

  const submit = () => {
    if (!current) return
    const ok = normalize(input) === normalize(current.en)
    setAttempts(a => a + 1)
    if (ok) setCorrect(c => c + 1)
    setHistory(h => [{ item: current, guess: input, ok }, ...h].slice(0, 5))

    if (feedbackTimer.current) window.clearTimeout(feedbackTimer.current)
    if (ok) {
      setFeedback({ ok: true, text: 'Correct!' })
      feedbackTimer.current = window.setTimeout(() => setFeedback(null), 800)
    } else {
      setFeedback({ ok: false, text: `Incorrect. Correct answer: ${current.en}` })
      feedbackTimer.current = window.setTimeout(() => setFeedback(null), 1800)
    }

    setInput('')
    if (i + 1 >= items.length) {
      setFinished(true)
    } else {
      setI(i + 1)
    }
  }

  const restart = () => {
    setI(0)
    setInput('')
    setCorrect(0)
    setAttempts(0)
    setHistory([])
    setFinished(false)
    setFeedback(null)
    if (feedbackTimer.current) window.clearTimeout(feedbackTimer.current)
  }

  const pass = pct >= 80

  return (
    <div className="card">
      <div className="header">
        <div>
          <h1>Level {levelIndex}: {level.title}</h1>
          <div className="sub">Score: {pct}% ({correct}/{attempts})</div>
        </div>
        <div style={{ minWidth: 160 }}>
          <div className="progress"><div style={{ width: `${progress}%` }} /></div>
        </div>
      </div>

      {!finished && (
        <>
          <div className="sanskrit" lang="sa">{current.sa}</div>
          {current.translit && <div className="translit">{current.translit}</div>}
          <div className="controls" style={{ margin: '12px 0' }}>
            <button onClick={() => speak(current.sa)} className="primary">Play audio</button>
            <button onClick={() => setInput(current.en)} className="ghost" title="Fill correct answer (practice)">Reveal</button>
          </div>

          {feedback && (
            <div style={{ margin: '6px 0 8px' }}>
              <span className={`badge ${feedback.ok ? 'ok' : 'fail'}`}>{feedback.text}</span>
            </div>
          )}

          <input
            className="input"
            placeholder="Type the English meaning..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') submit() }}
            autoFocus
          />
          <div className="controls" style={{ marginTop: 12 }}>
            <button onClick={submit} className="primary">Submit</button>
            <button onClick={() => onExit(false)} className="ghost">Quit</button>
          </div>

          {history.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <div className="sub" style={{ marginBottom: 8 }}>Recent answers</div>
              <div style={{ display: 'grid', gap: 8 }}>
                {history.map((h, idx) => (
                  <div key={idx} className="card" style={{ padding: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <div className="sanskrit" style={{ fontSize: '1.3rem' }}>{h.item.sa}</div>
                        <div className="sub">Correct: {h.item.en} • Your answer: {h.guess || '—'}</div>
                      </div>
                      <span className={`badge ${h.ok ? 'ok' : 'fail'}`}>{h.ok ? 'Correct' : 'Incorrect'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {finished && (
        <div style={{ textAlign: 'center' }}>
          <h2>Level complete</h2>
          <div className={`badge ${pass ? 'ok' : 'fail'}`} style={{ display: 'inline-block', marginBottom: 12 }}>
            Result: {pct}% ({correct}/{attempts})
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
            {pass ? (
              <button className="primary" onClick={() => onExit(true)}>Continue to next level</button>
            ) : (
              <>
                <button className="primary" onClick={restart}>Try again</button>
                <button className="danger" onClick={() => onExit(false)}>Quit</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

