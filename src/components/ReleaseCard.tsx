import type { Release, ReleaseType } from '../data/content'
import { asset } from '../lib/asset'
import { PlayIcon } from './Icons'
import { ExternalLink } from './ui'

const typeLabels: Record<ReleaseType, string> = { single: 'סינגל', ep: 'EP', album: 'אלבום' }

export function releaseMeta(release: Release): string {
  const parts: string[] = [typeLabels[release.type], String(release.year)]
  if (release.tracks) parts.push(`${release.tracks.length} שירים`)
  else if (release.duration) parts.push(release.duration)
  if (release.featuring) parts.push(`עם ${release.featuring}`)
  return parts.join(' · ')
}

// Prints are pinned at slightly different angles and straighten on hover.
const tilts = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2']

export function ReleaseCard({ release, index = 0 }: { release: Release; index?: number }) {
  const hasTracks = Boolean(release.tracks?.length)
  return (
    <article className={hasTracks ? 'col-span-2 grid grid-cols-2 gap-x-5 gap-y-3' : ''}>
      <ExternalLink
        href={release.spotifyUrl}
        aria-label={`להאזנה ל"${release.title}" בספוטיפיי`}
        className={`print block transition-transform duration-300 hover:rotate-0 focus-visible:rotate-0 motion-reduce:transition-none ${tilts[index % tilts.length]}`}
      >
        <img
          src={asset(release.cover)}
          alt={release.coverAlt}
          width={640}
          height={640}
          loading="lazy"
          className="aspect-square w-full"
        />
      </ExternalLink>

      <div className={hasTracks ? 'row-span-2' : 'mt-4'}>
        <h3 className="font-display text-xl leading-snug font-bold sm:text-2xl">
          <ExternalLink href={release.spotifyUrl} className="hover:text-plum-ink">
            {release.title}
          </ExternalLink>
        </h3>
        <p className="text-sm text-ink-soft sm:text-base">{releaseMeta(release)}</p>

        {release.tracks && (
          <ol className="mt-3 list-inside list-decimal space-y-1 text-sm marker:font-bold marker:text-plum-ink sm:text-base">
            {release.tracks.map((track) => (
              <li key={track.title}>
                {track.title}
                {track.href && (
                  <ExternalLink
                    href={track.href}
                    className="ms-2 inline-flex items-center gap-1 rounded-full border border-ink bg-sun px-2 text-xs font-bold align-middle"
                    aria-label={`לקליפ של "${track.title}"`}
                  >
                    <PlayIcon className="size-3" />
                    קליפ
                  </ExternalLink>
                )}
              </li>
            ))}
          </ol>
        )}
      </div>
    </article>
  )
}
