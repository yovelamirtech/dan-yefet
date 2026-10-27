import { useState } from 'react'
import { artist, images, nav } from '../data/content'
import { asset } from '../lib/asset'
import { MenuIcon } from './Icons'

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <img src={asset(images.boatMark)} alt="" width={40} height={40} className="size-10 rounded-full border-2 border-ink" />
          <span className="font-display text-3xl font-bold">{artist.name}</span>
        </a>

        <nav aria-label="ניווט ראשי" className="hidden md:block">
          <ul className="flex items-center gap-6 text-lg font-semibold">
            {nav.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="decoration-plum decoration-2 underline-offset-8 hover:underline">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="sketch flex size-11 items-center justify-center border-2 border-ink bg-sun shadow-hard-sm md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'סגירת התפריט' : 'פתיחת התפריט'}
          onClick={() => setOpen((v) => !v)}
        >
          <MenuIcon open={open} className="size-6" />
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="ניווט ראשי" className="border-t-2 border-ink bg-paper md:hidden">
          <ul className="mx-auto max-w-5xl px-4 py-2">
            {nav.map((item) => (
              <li key={item.id} className="border-b border-dashed border-ink/30 last:border-0">
                <a href={`#${item.id}`} className="block py-3 font-display text-3xl font-bold" onClick={() => setOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
