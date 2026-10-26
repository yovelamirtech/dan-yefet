import type { Show } from '../data/content'

/** Local calendar date as YYYY-MM-DD, comparable as a string with the ISO dates in content.ts. */
export function toIsoDate(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

/** A show stays "upcoming" through its last performance day. */
export function isPast(show: Show, today: Date): boolean {
  const last = [...show.dates].sort().at(-1)
  return last === undefined ? false : last < toIsoDate(today)
}

export function splitShows(shows: Show[], today: Date) {
  const byFirstDate = (a: Show, b: Show) => (a.dates[0] ?? '').localeCompare(b.dates[0] ?? '')
  const upcoming = shows.filter((s) => !isPast(s, today)).sort(byFirstDate)
  const past = shows.filter((s) => isPast(s, today)).sort(byFirstDate).reverse()
  return { upcoming, past }
}

/**
 * Hebrew-style short dates: "20.2.2026", "26–27.1.2026", "31.1–1.2.2026".
 * Non-consecutive days are joined with commas.
 */
export function formatShowDates(isoDates: string[]): string {
  const parts = [...isoDates].sort().map((iso) => {
    const [y, m, d] = iso.split('-').map(Number)
    return { y, m, d }
  })
  if (parts.length === 0) return ''
  const first = parts[0]
  const last = parts[parts.length - 1]
  const sameYear = parts.every((p) => p.y === first.y)
  const consecutive = parts.every((p, i) => {
    if (i === 0) return true
    const prev = parts[i - 1]
    const diff = Date.UTC(p.y, p.m - 1, p.d) - Date.UTC(prev.y, prev.m - 1, prev.d)
    return diff === 86_400_000
  })

  if (parts.length === 1) return `${first.d}.${first.m}.${first.y}`
  if (consecutive && sameYear) {
    return first.m === last.m
      ? `${first.d}–${last.d}.${last.m}.${last.y}`
      : `${first.d}.${first.m}–${last.d}.${last.m}.${last.y}`
  }
  return parts.map((p) => `${p.d}.${p.m}.${p.y}`).join(', ')
}
