import { useState } from 'react'
import { asset } from '../lib/asset'
import { PlayIcon } from './Icons'

// Third-party players load only after a click (facade), so the page stays fast on phones.

interface YouTubeFacadeProps {
  youtubeId: string
  title: string
  poster: string
  posterAlt: string
}

export function YouTubeFacade({ youtubeId, title, poster, posterAlt }: YouTubeFacadeProps) {
  const [active, setActive] = useState(false)
  return (
    <div className="relative aspect-video overflow-hidden border-2 border-ink bg-navy shadow-hard">
      {active ? (
        <iframe
          className="absolute inset-0 size-full"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          className="on-dark group absolute inset-0 flex size-full items-center justify-center"
        >
          <img src={asset(poster)} alt={posterAlt} loading="lazy" className="h-full object-contain" />
          <span className="absolute inset-0 bg-navy/20 transition-colors group-hover:bg-navy/5" />
          <span className="sketch absolute flex items-center gap-2 border-2 border-ink bg-brick-ink px-5 py-3 text-lg font-bold text-white shadow-hard transition-transform group-hover:scale-105 motion-reduce:transition-none">
            <PlayIcon className="size-6" />
            {`לצפייה בקליפ "${title}"`}
          </span>
        </button>
      )}
    </div>
  )
}

interface SpotifyFacadeProps {
  spotifyId: string
  title: string
}

export function SpotifyFacade({ spotifyId, title }: SpotifyFacadeProps) {
  const [active, setActive] = useState(false)
  if (active) {
    return (
      <iframe
        className="block h-[152px] w-full rounded-xl border-0"
        src={`https://open.spotify.com/embed/album/${spotifyId}?utm_source=generator&autoplay=1`}
        title={`נגן ספוטיפיי: ${title}`}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    )
  }
  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      className="sketch-alt group flex w-full items-center gap-4 border-2 border-dashed border-ink bg-paper-deep px-4 py-3 text-start transition-colors hover:bg-white motion-reduce:transition-none"
    >
      <span className="flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-sun transition-transform group-hover:scale-110 motion-reduce:transition-none">
        <PlayIcon className="size-6" />
      </span>
      <span>
        <span className="block text-lg font-bold">{`לנגן את "${title}" כאן`}</span>
        <span className="block text-sm text-ink-soft">נגן ספוטיפיי ייטען בלחיצה</span>
      </span>
    </button>
  )
}
