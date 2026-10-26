import { images, links } from '../data/content'
import { asset } from '../lib/asset'
import { ArrowIcon } from './Icons'
import { ExternalLink, Section, SectionHeading } from './ui'

const cards = [
  { ...links.whatsapp, image: images.whatsapp, className: 'bg-sun text-ink sketch -rotate-1' },
  { ...links.newsletter, image: images.newsletter, className: 'bg-plum text-white sketch-alt rotate-1' },
]

export function StayUpdated() {
  return (
    <Section id="updates" labelledBy="updates-title">
      <SectionHeading kicker="לא לפספס" title="להישאר מעודכנים" id="updates-title" />
      <ul className="grid gap-6 sm:grid-cols-2">
        {cards.map((card) => (
          <li key={card.href}>
            <ExternalLink
              href={card.href}
              className={`flex min-h-28 items-center gap-4 border-2 border-ink p-4 text-xl font-bold shadow-hard transition-[transform,box-shadow] duration-150 hover:rotate-0 hover:shadow-hard-lg motion-reduce:transition-none sm:text-2xl ${card.className}`}
            >
              <img src={asset(card.image)} alt="" width={80} height={80} loading="lazy" className="size-20 shrink-0 rounded-lg border-2 border-ink bg-white object-cover" />
              <span className="flex-1">{card.label}</span>
              <ArrowIcon className="size-7 shrink-0" />
            </ExternalLink>
          </li>
        ))}
      </ul>
    </Section>
  )
}
