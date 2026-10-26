import { render, screen, within } from '@testing-library/react'
import type { Show } from '../data/content'
import { Shows } from './Shows'

const shows: Show[] = [
  { id: 'sugar', title: 'שוגר (ק)ראש', venue: 'הבימה 4', dates: ['2026-01-26', '2026-01-27'], ticketsUrl: 'https://bit.ly/496863V' },
  { id: 'lidfok', title: 'לדפוק', venue: 'צוותא 2', dates: ['2026-02-20'], ticketsUrl: 'https://bit.ly/49ELxDC' },
]

const listAfter = (headingName: string) =>
  screen.getByRole('heading', { name: headingName }).nextElementSibling as HTMLElement

describe('Shows', () => {
  it('lists future shows as upcoming with a tickets button', () => {
    render(<Shows shows={shows} today={new Date(2026, 0, 1)} />)
    const upcoming = listAfter('הופעות קרובות')
    expect(within(upcoming).getAllByRole('article')).toHaveLength(2)
    expect(within(upcoming).getByRole('link', { name: 'לכרטיסים: שוגר (ק)ראש' })).toHaveAttribute('href', 'https://bit.ly/496863V')
    expect(within(upcoming).getByText('26–27.1.2026')).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'הופעות שעברו' })).toBeNull()
  })

  it('moves a show to "past" after its last date, with a stamp', () => {
    render(<Shows shows={shows} today={new Date(2026, 0, 28)} />)
    expect(within(listAfter('הופעות קרובות')).getByRole('heading', { name: 'לדפוק' })).toBeInTheDocument()
    const past = listAfter('הופעות שעברו')
    expect(within(past).getByRole('heading', { name: 'שוגר (ק)ראש' })).toBeInTheDocument()
    expect(within(past).getByText('עבר')).toBeInTheDocument()
    expect(within(past).getByRole('link', { name: 'לעמוד ההצגה: שוגר (ק)ראש' })).toBeInTheDocument()
  })

  it('shows an empty state pointing to updates when nothing is upcoming', () => {
    render(<Shows shows={shows} today={new Date(2026, 5, 1)} />)
    expect(screen.getByText(/אין כרגע הופעות קרובות/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'הצטרפו לעדכונים' })).toHaveAttribute('href', '#updates')
    expect(within(listAfter('הופעות שעברו')).getAllByRole('article')).toHaveLength(2)
  })

  it('always links to the theater music page', () => {
    render(<Shows shows={[]} />)
    expect(screen.getByRole('link', { name: 'מוזיקה לתאטרון' })).toHaveAttribute('href', 'https://bit.ly/4hb97sW')
  })
})
