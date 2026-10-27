import { links, shows as defaultShows, type Show } from '../data/content'
import { splitShows } from '../lib/shows'
import { ShowCard } from './ShowCard'
import { LinkButton, Section, SectionHeading } from './ui'

interface ShowsProps {
  shows?: Show[]
  /** Injected in tests; defaults to now. */
  today?: Date
}

export function Shows({ shows = defaultShows, today = new Date() }: ShowsProps) {
  const { upcoming, past } = splitShows(shows, today)

  return (
    <Section id="theater" labelledBy="theater-title" className="bg-paper-deep/60">
      <SectionHeading kicker="על הבמה" title="מוזיקה לתאטרון והופעות" id="theater-title" />

      <h3 className="mb-4 font-display text-3xl font-bold">הופעות קרובות</h3>
      {upcoming.length > 0 ? (
        <ul className="grid gap-6 md:grid-cols-2">
          {upcoming.map((show) => (
            <li key={show.id}>
              <ShowCard show={show} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="sketch-alt border-2 border-dashed border-ink px-5 py-4 text-lg">
          אין כרגע הופעות קרובות.{' '}
          <a href="#updates" className="font-bold text-plum-ink underline decoration-2 underline-offset-4">
            הצטרפו לעדכונים
          </a>{' '}
          כדי לשמוע ראשונים על תאריכים חדשים.
        </p>
      )}

      {past.length > 0 && (
        <>
          <h3 className="mt-12 mb-4 font-display text-3xl font-bold">הופעות שעברו</h3>
          <ul className="grid gap-6 md:grid-cols-2">
            {past.map((show) => (
              <li key={show.id}>
                <ShowCard show={show} past />
              </li>
            ))}
          </ul>
        </>
      )}

      <div className="mt-12">
        <LinkButton href={links.theaterMusic.href} variant="sun" arrow>
          {links.theaterMusic.label}
        </LinkButton>
      </div>
    </Section>
  )
}
