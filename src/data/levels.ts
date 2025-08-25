export type VocabItem = {
  sa: string // Sanskrit (Devanagari)
  en: string // English meaning (single word ideally)
  translit?: string // IAST or basic transliteration
}

export type Level = {
  title: string
  items: VocabItem[]
}

export const TOTAL_LEVELS = 11 // 0..10

const filler = (n: number, base: VocabItem[]): VocabItem[] => {
  // For now, duplicate and slightly vary entries to reach 50 while user curates later.
  const out: VocabItem[] = []
  while (out.length < 50) {
    for (const item of base) {
      if (out.length >= 50) break
      out.push({ ...item })
    }
  }
  return out.slice(0, 50)
}

// Level 0: common basics (50 curated entries)
const level0: Level = {
  title: 'Basics I',
  items: [
    { sa: 'नमस्ते', en: 'hello', translit: 'namaste' },
    { sa: 'धन्यवादः', en: 'thanks', translit: 'dhanyavādaḥ' },
    { sa: 'कृपया', en: 'please', translit: 'kṛpayā' },
    { sa: 'शुभम्', en: 'good', translit: 'śubham' },
    { sa: 'अहम्', en: 'i', translit: 'aham' },
    { sa: 'त्वम्', en: 'you', translit: 'tvam' },
    { sa: 'सः', en: 'he', translit: 'saḥ' },
    { sa: 'सा', en: 'she', translit: 'sā' },
    { sa: 'एतत्', en: 'this', translit: 'etat' },
    { sa: 'तत्', en: 'that', translit: 'tat' },
    { sa: 'कः', en: 'who', translit: 'kaḥ' },
    { sa: 'किम्', en: 'what', translit: 'kim' },
    { sa: 'कुत्र', en: 'where', translit: 'kutra' },
    { sa: 'कदा', en: 'when', translit: 'kadā' },
    { sa: 'कथम्', en: 'how', translit: 'katham' },
    { sa: 'कुतः', en: 'why', translit: 'kutaḥ' },
    { sa: 'भोजनम्', en: 'food', translit: 'bhojanam' },
    { sa: 'जलम्', en: 'water', translit: 'jalam' },
    { sa: 'गृहः', en: 'house', translit: 'gṛhaḥ' },
    { sa: 'पथः', en: 'road', translit: 'pathaḥ' },
    { sa: 'शाला', en: 'school', translit: 'śālā' },
    { sa: 'गुरुः', en: 'teacher', translit: 'guruḥ' },
    { sa: 'शिष्यः', en: 'student', translit: 'śiṣyaḥ' },
    { sa: 'पुस्तकम्', en: 'book', translit: 'pustakam' },
    { sa: 'लेखनम्', en: 'writing', translit: 'lekhanam' },
    { sa: 'वाचनम्', en: 'reading', translit: 'vācanam' },
    { sa: 'चित्रम्', en: 'picture', translit: 'citram' },
    { sa: 'फलम्', en: 'fruit', translit: 'phalam' },
    { sa: 'पुष्पम्', en: 'flower', translit: 'puṣpam' },
    { sa: 'वृक्षः', en: 'tree', translit: 'vṛkṣaḥ' },
    { sa: 'मित्रम्', en: 'friend', translit: 'mitram' },
    { sa: 'कुटुम्बम्', en: 'family', translit: 'kuṭumbam' },
    { sa: 'नगरम्', en: 'city', translit: 'nagaram' },
    { sa: 'ग्रामः', en: 'village', translit: 'grāmaḥ' },
    { sa: 'दिवसः', en: 'day', translit: 'divasaḥ' },
    { sa: 'रात्रिः', en: 'night', translit: 'rātriḥ' },
    { sa: 'सूर्यः', en: 'sun', translit: 'sūryaḥ' },
    { sa: 'चन्द्रः', en: 'moon', translit: 'candraḥ' },
    { sa: 'नभः', en: 'sky', translit: 'nabhaḥ' },
    { sa: 'भूमिः', en: 'earth', translit: 'bhūmiḥ' },
    { sa: 'गङ्गा', en: 'ganga', translit: 'gaṅgā' },
    { sa: 'वायु', en: 'air', translit: 'vāyu' },
    { sa: 'अग्निः', en: 'fire', translit: 'agniḥ' },
    { sa: 'जलधिः', en: 'ocean', translit: 'jaladhiḥ' },
    { sa: 'पर्वतः', en: 'mountain', translit: 'parvataḥ' },
    { sa: 'वनम्', en: 'forest', translit: 'vanam' },
    { sa: 'मार्गः', en: 'path', translit: 'mārgaḥ' },
    { sa: 'हृदयम्', en: 'heart', translit: 'hṛdayam' },
    { sa: 'मस्तिष्कः', en: 'brain', translit: 'mastiṣkaḥ' },
    { sa: 'नेत्रे', en: 'eyes', translit: 'netre' }
  ]
}

const base1: VocabItem[] = [
  { sa: 'गच्छामि', en: 'go', translit: 'gacchāmi' },
  { sa: 'आगच्छामि', en: 'come', translit: 'āgacchāmi' },
  { sa: 'पश्यामि', en: 'see', translit: 'paśyāmi' },
  { sa: 'शृणोमि', en: 'hear', translit: 'śṛṇomi' },
  { sa: 'वदामि', en: 'speak', translit: 'vadāmi' },
  { sa: 'जाने', en: 'know', translit: 'jāne' },
  { sa: 'मन्ये', en: 'think', translit: 'manye' },
  { sa: 'क्रीडामि', en: 'play', translit: 'krīḍāmi' },
  { sa: 'नयामि', en: 'lead', translit: 'nayāmi' },
  { sa: 'लिखामि', en: 'write', translit: 'likhāmi' }
]

export const LEVELS: Level[] = [
  level0,
  { title: 'Basics II', items: filler(1, base1) },
  { title: 'Daily Life I', items: filler(2, base1) },
  { title: 'Daily Life II', items: filler(3, base1) },
  { title: 'Objects', items: filler(4, base1) },
  { title: 'Nature', items: filler(5, base1) },
  { title: 'People', items: filler(6, base1) },
  { title: 'Verbs I', items: filler(7, base1) },
  { title: 'Verbs II', items: filler(8, base1) },
  { title: 'Abstract', items: filler(9, base1) },
  { title: 'Review', items: filler(10, base1) }
]

export default LEVELS

