import { releases as defaultReleases, type Release } from '../data/content'
import { ReleaseCard } from './ReleaseCard'
import { Section, SectionHeading } from './ui'

export function Discography({ releases = defaultReleases }: { releases?: Release[] }) {
  return (
    <Section id="music" labelledBy="music-title">
      <SectionHeading kicker="כל השירים" title="דיסקוגרפיה" id="music-title" />
      <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 md:gap-x-8">
        {releases.map((release, i) => (
          <ReleaseCard key={release.id} release={release} index={i} />
        ))}
      </div>
    </Section>
  )
}
