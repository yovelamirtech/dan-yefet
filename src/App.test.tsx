import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

// Acceptance criteria from dan-yefet-plan.md, checked against the rendered page.

const BITLY_LINKS = [
  'https://bit.ly/4pilPJN', // קולות הפריווילגים – clip
  'https://spoti.fi/3ItrLNs', // Spotify
  'https://apple.co/449nhn7', // Apple Music
  'https://bit.ly/496863V', // שוגר (ק)ראש
  'https://bit.ly/49ELxDC', // לדפוק
  'https://bit.ly/4hb97sW', // מוזיקה לתאטרון
  'https://bit.ly/3ff9zvM', // חשוף
  'https://bit.ly/3jVaKCA', // WhatsApp
  'https://bit.ly/3gR2otT', // newsletter
]

const SOCIALS: Record<string, string> = {
  Instagram: 'https://instagram.com/danyefet_bn',
  TikTok: 'https://www.tiktok.com/@danyefet_bn',
  YouTube: 'https://www.youtube.com/@DanYeffetsmusic',
  Facebook: 'https://www.facebook.com/DanYefetandbneynoah',
  Spotify: 'https://open.spotify.com/artist/38GgACs7gR1kBhAKXyot5o',
  'Apple Music': 'https://apple.co/449nhn7',
}

const RELEASES = [
  { title: 'חייב לעזוב', cover: 'cover-hayav-laazov', spotify: '0BBgHoR0seDEWyj7UBE5ei' },
  { title: 'קולות הפריווילגים', cover: 'cover-kolot', spotify: '3MwVcVjFguhBP98rScBaHj' },
  { title: "עדיין רוצה (לזיין ת'עולם)", cover: 'cover-adayin-rotze', spotify: '53ZuyybZVdbiHTyeH3ynEm' },
  { title: 'המדינה הכי טובה בעולם', cover: 'cover-hamedina', spotify: '2A0RLxyfEAGzMvSeiVkkst' },
  { title: 'דן יפת', cover: 'cover-ep', spotify: '0CnJfXcFdvTTmz5T6HmN7S' },
]

const hrefs = () => Array.from(document.querySelectorAll('a'), (a) => a.getAttribute('href'))

describe('App', () => {
  it('renders the artist name as the page heading', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1, name: 'דן יפת' })).toBeInTheDocument()
  })

  it('links every button from the old bit.ly page', () => {
    render(<App />)
    const all = hrefs()
    for (const link of BITLY_LINKS) expect(all, link).toContain(link)
  })

  it('links every social network with an accessible label in the hero and footer', () => {
    render(<App />)
    for (const [label, href] of Object.entries(SOCIALS)) {
      const links = screen.getAllByRole('link', { name: label })
      expect(links.length, label).toBeGreaterThanOrEqual(2)
      for (const link of links) expect(link).toHaveAttribute('href', href)
    }
  })

  it('shows every release in the discography with its own cover and Spotify link', () => {
    render(<App />)
    const discography = screen.getByRole('region', { name: 'דיסקוגרפיה' })
    for (const { title, cover, spotify } of RELEASES) {
      const heading = within(discography).getByRole('heading', { level: 3, name: title })
      const card = heading.closest('article')!
      expect(within(card).getByRole('link', { name: title })).toHaveAttribute('href', `https://open.spotify.com/album/${spotify}`)
      expect(within(card).getAllByRole('img')[0].getAttribute('src')).toContain(`images/${cover}.webp`)
    }
  })

  it('lists the EP tracks with a clip link for "חשוף"', () => {
    render(<App />)
    const tracks = screen.getAllByRole('listitem').filter((li) => li.closest('ol'))
    expect(tracks.map((li) => li.firstChild?.textContent)).toEqual([
      'הבלדה על השיער הקצר והשיער הקצר',
      'שפתיים',
      'חשוף',
      'אינסטגרם',
      'ליל הסדר',
      'לאהוב בגדול',
    ])
    expect(screen.getByRole('link', { name: 'לקליפ של "חשוף"' })).toHaveAttribute('href', 'https://bit.ly/3ff9zvM')
  })

  it('loads every image from the project, never from an external server', () => {
    render(<App />)
    const images = document.querySelectorAll('img')
    expect(images.length).toBeGreaterThan(0)
    for (const img of images) {
      expect(img.getAttribute('src')).not.toMatch(/^(https?:)?\/\//)
      expect(img).toHaveAttribute('alt')
    }
  })

  it('opens external links in a new tab safely', () => {
    render(<App />)
    for (const a of document.querySelectorAll('a[href^="http"]')) {
      expect(a).toHaveAttribute('target', '_blank')
      expect(a.getAttribute('rel')).toContain('noopener')
    }
  })

  it('has a navigation link for every section', () => {
    render(<App />)
    const sectionIds = ['new', 'music', 'theater', 'about', 'updates']
    for (const id of sectionIds) {
      expect(document.getElementById(id), id).not.toBeNull()
      expect(hrefs()).toContain(`#${id}`)
    }
  })
})

describe('mobile menu', () => {
  it('opens, and closes after choosing a section', async () => {
    const user = userEvent.setup()
    render(<App />)
    const toggle = screen.getByRole('button', { name: 'פתיחת התפריט' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(document.getElementById('mobile-menu')).toBeNull()

    await user.click(toggle)
    expect(screen.getByRole('button', { name: 'סגירת התפריט' })).toHaveAttribute('aria-expanded', 'true')
    const menu = document.getElementById('mobile-menu')!
    await user.click(within(menu).getByRole('link', { name: 'אודות' }))
    expect(document.getElementById('mobile-menu')).toBeNull()
  })
})

describe('embeds load only after a click', () => {
  it('replaces the YouTube poster with the player', async () => {
    const user = userEvent.setup()
    render(<App />)
    expect(document.querySelector('iframe')).toBeNull()

    await user.click(screen.getByRole('button', { name: /לצפייה בקליפ "קולות הפריווילגים"/ }))
    const player = screen.getByTitle('קולות הפריווילגים')
    expect(player.tagName).toBe('IFRAME')
    expect(player.getAttribute('src')).toContain('youtube-nocookie.com/embed/ReSIDNbsmqE')
  })

  it('replaces the Spotify button with the player', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: /לנגן את "חייב לעזוב" כאן/ }))
    expect(screen.getByTitle('נגן ספוטיפיי: חייב לעזוב').getAttribute('src')).toContain(
      'open.spotify.com/embed/album/0BBgHoR0seDEWyj7UBE5ei',
    )
  })
})
