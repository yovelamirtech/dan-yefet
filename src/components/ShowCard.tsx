import type { Show } from '../data/content'
import { formatShowDates } from '../lib/shows'
import { LinkButton } from './ui'

/** A show as a newspaper column: double rules, kicker, headline, details. */
export function ShowCard({ show, past = false }: { show: Show; past?: boolean }) {
  return (
    <article
      className={`relative border-y-[6px] border-double border-ink bg-white/60 px-5 py-5 ${past ? 'opacity-80' : ''}`}
    >
      {past && (
        <span className="absolute end-4 top-4 -rotate-12 border-[3px] border-brick-ink px-2 font-hand text-3xl leading-none font-bold text-brick-ink">
          עבר
        </span>
      )}
      {show.note && <p className="font-hand text-2xl font-bold text-plum-ink">{show.note}</p>}
      <h3 className="font-display text-4xl font-bold">{show.title}</h3>
      <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-lg">
        <dt className="font-semibold text-ink-soft">מתי</dt>
        <dd>
          {/* dir="ltr" isolates the numbers so "26–27.1" is not reordered by the RTL text. */}
          <time dateTime={show.dates[0]} dir="ltr">
            {formatShowDates(show.dates)}
          </time>
        </dd>
        <dt className="font-semibold text-ink-soft">איפה</dt>
        <dd>{show.venue}</dd>
      </dl>
      <LinkButton
        href={show.ticketsUrl}
        variant={past ? 'paper' : 'brick'}
        arrow
        className="mt-5"
        aria-label={`${past ? 'לעמוד ההצגה' : 'לכרטיסים'}: ${show.title}`}
      >
        {past ? 'לעמוד ההצגה' : 'לכרטיסים'}
      </LinkButton>
    </article>
  )
}
