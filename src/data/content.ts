// All site content lives here. Adding a release or a show only requires editing this file.
// Source: dan-yefet-plan.md (bit.ly page + Spotify artist page, collected 26.10.2026).
// Items marked TODO are waiting for answers from Dan (see the plan's open questions).

export type SocialNetwork = 'instagram' | 'tiktok' | 'youtube' | 'facebook' | 'spotify' | 'appleMusic'

export interface SocialLink {
  network: SocialNetwork
  label: string
  href: string
}

export interface Link {
  label: string
  href: string
}

export interface Track {
  title: string
  /** Optional link for a track that has its own clip or page. */
  href?: string
}

export type ReleaseType = 'single' | 'ep' | 'album'

export interface Release {
  id: string
  title: string
  year: number
  type: ReleaseType
  /** Single length, e.g. "2:54". */
  duration?: string
  featuring?: string
  spotifyUrl: string
  /** Spotify album id, used for the embedded player. */
  spotifyId: string
  cover: string
  coverAlt: string
  tracks?: Track[]
}

export interface Show {
  id: string
  title: string
  venue: string
  /** Every performance date, ISO format (YYYY-MM-DD). */
  dates: string[]
  note?: string
  ticketsUrl: string
}

export interface Clip {
  title: string
  label: string
  youtubeId: string
  href: string
  poster: string
  posterAlt: string
}

/** Paths are relative to /public and get the Vite base prefix at render time. */
export const images = {
  heroPortrait: 'images/avatar.webp',
  heroPortraitAlt: 'דן יפת מנגן בעוד ושר למיקרופון',
  boat: 'images/boat-banner.webp',
  boatMark: 'images/boat-mark.webp',
  about: 'images/artist.webp',
  aboutAlt: 'דן יפת בתחפושת עם פאה לבנה, מחזיק כלב פומרניאן',
  whatsapp: 'images/thumb-whatsapp.webp',
  newsletter: 'images/thumb-newsletter.webp',
}

export const artist = {
  name: 'דן יפת',
  // TODO(Dan): Dan Yefet (Spotify) or Dan Yeffet (YouTube / bit.ly)?
  nameEn: 'Dan Yefet',
  // TODO(Dan): final one-line description for the Hero.
  tagline: 'מוזיקאי וקומפוזיטור לתאטרון',
  // TODO(Dan): replace with Dan's own about text. Until then only facts from the plan.
  about: [
    'דן יפת הוא מוזיקאי וקומפוזיטור לתאטרון.',
    'ב-2022 יצא ה-EP הראשון שלו, "דן יפת", ומאז הוציא סינגלים, ביניהם "המדינה הכי טובה בעולם", "קולות הפריווילגים" ו"חייב לעזוב". לצד השירים הוא כותב מוזיקה מקורית להפקות תאטרון.',
  ],
  // TODO(Dan): contact for shows and bookings (email / phone). Footer hides the line while empty.
  contactEmail: '',
}

export const socials: SocialLink[] = [
  { network: 'instagram', label: 'Instagram', href: 'https://instagram.com/danyefet_bn' },
  { network: 'tiktok', label: 'TikTok', href: 'https://www.tiktok.com/@danyefet_bn' },
  { network: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@DanYeffetsmusic' },
  { network: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/DanYefetandbneynoah' },
  { network: 'spotify', label: 'Spotify', href: 'https://open.spotify.com/artist/38GgACs7gR1kBhAKXyot5o' },
  { network: 'appleMusic', label: 'Apple Music', href: 'https://apple.co/449nhn7' },
]

// TODO(Dan): keep the bit.ly links (click tracking) or switch to direct links?
export const links = {
  spotify: { label: 'ספוטיפיי', href: 'https://spoti.fi/3ItrLNs' },
  appleMusic: { label: 'אפל מיוזיק', href: 'https://apple.co/449nhn7' },
  // TODO(Dan): where should this lead? Currently a Google Drive folder.
  theaterMusic: { label: 'מוזיקה לתאטרון', href: 'https://bit.ly/4hb97sW' },
  whatsapp: { label: 'קבוצת וואטסאפ שקטה לעדכונים', href: 'https://bit.ly/3jVaKCA' },
  newsletter: { label: 'הרשמה לניוזלטר', href: 'https://bit.ly/3gR2otT' },
} satisfies Record<string, Link>

// Newest first.
export const releases: Release[] = [
  {
    id: 'hayav-laazov',
    title: 'חייב לעזוב',
    year: 2026,
    type: 'single',
    duration: '2:54',
    featuring: 'אריק אבר',
    spotifyUrl: 'https://open.spotify.com/album/0BBgHoR0seDEWyj7UBE5ei',
    spotifyId: '0BBgHoR0seDEWyj7UBE5ei',
    cover: 'images/cover-hayav-laazov.webp',
    coverAlt: 'עטיפת "חייב לעזוב": איור של רוכב אופניים בחולצה סגולה',
  },
  {
    id: 'kolot',
    title: 'קולות הפריווילגים',
    year: 2025,
    type: 'single',
    duration: '2:12',
    spotifyUrl: 'https://open.spotify.com/album/3MwVcVjFguhBP98rScBaHj',
    spotifyId: '3MwVcVjFguhBP98rScBaHj',
    cover: 'images/cover-kolot.webp',
    coverAlt: 'עטיפת "קולות הפריווילגים": איור של דמות במכנסיים סגולים על כיסא, רצפה משובצת אדומה',
  },
  {
    id: 'adayin-rotze',
    title: "עדיין רוצה (לזיין ת'עולם)",
    year: 2025,
    type: 'single',
    duration: '3:29',
    featuring: 'סולטי',
    spotifyUrl: 'https://open.spotify.com/album/53ZuyybZVdbiHTyeH3ynEm',
    spotifyId: '53ZuyybZVdbiHTyeH3ynEm',
    cover: 'images/cover-adayin-rotze.webp',
    coverAlt: 'עטיפת "עדיין רוצה": איור של דמות מחזיקה גלובוס סגול',
  },
  {
    id: 'hamedina',
    title: 'המדינה הכי טובה בעולם',
    year: 2024,
    type: 'single',
    duration: '4:09',
    spotifyUrl: 'https://open.spotify.com/album/2A0RLxyfEAGzMvSeiVkkst',
    spotifyId: '2A0RLxyfEAGzMvSeiVkkst',
    cover: 'images/cover-hamedina.webp',
    coverAlt: 'עטיפת "המדינה הכי טובה בעולם": צילום של דן בשדה פרחי בר',
  },
  {
    id: 'ep',
    title: 'דן יפת',
    year: 2022,
    type: 'ep',
    featuring: 'בן מוש (בשיר 1)',
    spotifyUrl: 'https://open.spotify.com/album/0CnJfXcFdvTTmz5T6HmN7S',
    spotifyId: '0CnJfXcFdvTTmz5T6HmN7S',
    cover: 'images/cover-ep.webp',
    coverAlt: 'עטיפת ה-EP "דן יפת": איור של דן ליד קלידים, עוד ועציצים',
    tracks: [
      { title: 'הבלדה על השיער הקצר והשיער הקצר' },
      { title: 'שפתיים' },
      { title: 'חשוף', href: 'https://bit.ly/3ff9zvM' },
      { title: 'אינסטגרם' },
      { title: 'ליל הסדר' },
      { title: 'לאהוב בגדול' },
    ],
  },
]

// TODO(Dan): what goes in "חדש"? bit.ly marks the "קולות הפריווילגים" clip as new,
// Spotify's newest release is "חייב לעזוב". For now: the newest release + the clip.
export const latest = {
  releaseId: 'hayav-laazov',
  clip: {
    title: 'קולות הפריווילגים',
    label: 'קליפ חדש',
    youtubeId: 'ReSIDNbsmqE',
    href: 'https://bit.ly/4pilPJN',
    poster: 'images/cover-kolot.webp',
    posterAlt: 'עטיפת "קולות הפריווילגים"',
  } satisfies Clip,
}

// TODO(Dan): are these still relevant? Which year? The bit.ly page only says 26–27.1 and 20.2,
// the year 2026 is an assumption. Past shows are moved to "הופעות שעברו" automatically.
export const shows: Show[] = [
  {
    id: 'sugar-rush',
    title: 'שוגר (ק)ראש',
    venue: 'הבימה 4',
    dates: ['2026-01-26', '2026-01-27'],
    note: 'מוזיקה מקורית שלי',
    ticketsUrl: 'https://bit.ly/496863V',
  },
  {
    id: 'lidfok',
    title: 'לדפוק',
    venue: 'צוותא 2',
    dates: ['2026-02-20'],
    note: 'מוזיקה מקורית שלי',
    ticketsUrl: 'https://bit.ly/49ELxDC',
  },
]

export const nav = [
  { id: 'new', label: 'חדש' },
  { id: 'music', label: 'דיסקוגרפיה' },
  { id: 'theater', label: 'תאטרון והופעות' },
  { id: 'about', label: 'אודות' },
  { id: 'updates', label: 'עדכונים' },
] as const
