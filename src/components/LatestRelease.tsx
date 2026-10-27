import { latest, links, releases, type Release } from '../data/content'
import { asset } from '../lib/asset'
import { SpotifyFacade, YouTubeFacade } from './Embeds'
import { AppleMusicIcon, SpotifyIcon } from './Icons'
import { releaseMeta } from './ReleaseCard'
import { ExternalLink, LinkButton, Section, SectionHeading } from './ui'

export function LatestRelease({ release = releases.find((r) => r.id === latest.releaseId) }: { release?: Release }) {
  const { clip } = latest
  if (!release) return null

  return (
    <Section id="new" labelledBy="new-title">
      <SectionHeading kicker="חדש" title={release.title} id="new-title" />

      <div className="grid items-start gap-10 md:grid-cols-2">
        <ExternalLink
          href={release.spotifyUrl}
          className="print mx-auto block w-full max-w-sm -rotate-[1.5deg] transition-transform duration-300 hover:rotate-0 motion-reduce:transition-none"
          aria-label={`להאזנה ל"${release.title}" בספוטיפיי`}
        >
          <img src={asset(release.cover)} alt={release.coverAlt} width={640} height={640} className="aspect-square w-full" />
        </ExternalLink>

        <div className="flex flex-col gap-6">
          <p className="text-xl text-ink-soft">{releaseMeta(release)}</p>
          <div className="flex flex-wrap gap-4">
            <LinkButton href={release.spotifyUrl} icon={<SpotifyIcon className="size-6" />}>
              ספוטיפיי
            </LinkButton>
            <LinkButton href={links.appleMusic.href} variant="paper" icon={<AppleMusicIcon className="size-5" />}>
              {links.appleMusic.label}
            </LinkButton>
          </div>
          <SpotifyFacade spotifyId={release.spotifyId} title={release.title} />
        </div>
      </div>

      <div className="mt-16">
        <h3 className="mb-4 flex flex-wrap items-baseline gap-x-3">
          <span className="font-hand text-3xl font-bold text-brick-ink">{clip.label}</span>
          <span className="font-display text-4xl font-bold">{clip.title}</span>
        </h3>
        <YouTubeFacade youtubeId={clip.youtubeId} title={clip.title} poster={clip.poster} posterAlt={clip.posterAlt} />
        <ExternalLink
          href={clip.href}
          className="mt-4 inline-block font-semibold text-plum-ink underline decoration-2 underline-offset-4"
        >
          לצפייה ביוטיוב
        </ExternalLink>
      </div>
    </Section>
  )
}
