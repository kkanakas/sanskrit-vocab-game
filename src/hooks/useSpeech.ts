import { useEffect, useMemo, useRef } from 'react'

export type SpeakOptions = {
  rate?: number
  pitch?: number
  volume?: number
}

export function useSpeech() {
  const voicesRef = useRef<SpeechSynthesisVoice[] | null>(null)

  useEffect(() => {
    const load = () => {
      voicesRef.current = window.speechSynthesis.getVoices()
    }
    load()
    window.speechSynthesis.onvoiceschanged = load
    return () => { window.speechSynthesis.onvoiceschanged = null }
  }, [])

  const findSanskritVoice = useMemo(() => {
    return () => {
      const voices = voicesRef.current || []
      // Try Hindi/Marathi/Generic Indic as Sanskrit voices are rare in TTS engines
      const preferredLangs = ['sa', 'hi', 'mr', 'ne', 'bn']
      const exact = voices.find(v => v.lang?.toLowerCase().startsWith('sa'))
      if (exact) return exact
      for (const tag of preferredLangs) {
        const v = voices.find(v => v.lang?.toLowerCase().startsWith(tag))
        if (v) return v
      }
      return voices[0]
    }
  }, [])

  const speak = (text: string, opts: SpeakOptions = {}) => {
    try {
      if (!('speechSynthesis' in window)) return false
      window.speechSynthesis.cancel()
      const u = new SpeechSynthesisUtterance(text)
      const v = findSanskritVoice()
      if (v) u.voice = v
      u.rate = opts.rate ?? 0.95
      u.pitch = opts.pitch ?? 1.0
      u.volume = opts.volume ?? 1.0
      window.speechSynthesis.speak(u)
      return true
    } catch {
      return false
    }
  }

  return { speak }
}

