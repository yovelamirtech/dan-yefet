import type { Show } from '../data/content'
import { formatShowDates, isPast, splitShows, toIsoDate } from './shows'

const show = (id: string, dates: string[]): Show => ({ id, title: id, venue: 'v', dates, ticketsUrl: 'https://x' })

describe('toIsoDate', () => {
  it('uses the local calendar date with zero padding', () => {
    expect(toIsoDate(new Date(2026, 0, 5, 23, 30))).toBe('2026-01-05')
  })
})

describe('isPast', () => {
  const run = show('run', ['2026-01-26', '2026-01-27'])

  it('is not past on the last performance day', () => {
    expect(isPast(run, new Date(2026, 0, 27, 22, 0))).toBe(false)
  })

  it('is past the day after the last performance', () => {
    expect(isPast(run, new Date(2026, 0, 28))).toBe(true)
  })

  it('looks at the latest date even when dates are unordered', () => {
    expect(isPast(show('x', ['2026-03-01', '2026-01-01']), new Date(2026, 1, 1))).toBe(false)
  })
})

describe('splitShows', () => {
  const a = show('a', ['2026-01-10'])
  const b = show('b', ['2026-02-10'])
  const c = show('c', ['2026-03-10'])
  const d = show('d', ['2026-04-10'])

  it('sorts upcoming soonest first and past most recent first', () => {
    const { upcoming, past } = splitShows([d, a, c, b], new Date(2026, 1, 20))
    expect(upcoming.map((s) => s.id)).toEqual(['c', 'd'])
    expect(past.map((s) => s.id)).toEqual(['b', 'a'])
  })
})

describe('formatShowDates', () => {
  it('formats a single date', () => {
    expect(formatShowDates(['2026-02-20'])).toBe('20.2.2026')
  })

  it('collapses consecutive days in one month', () => {
    expect(formatShowDates(['2026-01-27', '2026-01-26'])).toBe('26–27.1.2026')
  })

  it('collapses consecutive days across months', () => {
    expect(formatShowDates(['2026-01-31', '2026-02-01'])).toBe('31.1–1.2.2026')
  })

  it('lists non-consecutive days', () => {
    expect(formatShowDates(['2026-01-10', '2026-01-12'])).toBe('10.1.2026, 12.1.2026')
  })

  it('returns an empty string for no dates', () => {
    expect(formatShowDates([])).toBe('')
  })
})
