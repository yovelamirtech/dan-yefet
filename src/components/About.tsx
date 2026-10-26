import { artist, images } from '../data/content'
import { asset } from '../lib/asset'
import { Section, SectionHeading } from './ui'

export function About() {
  return (
    <Section id="about" labelledBy="about-title">
      <div className="grid items-center gap-10 md:grid-cols-[1fr_1.3fr]">
        <figure className="mx-auto w-full max-w-[17rem] md:order-last md:max-w-xs">
          <div className="print rotate-2 transition-transform duration-300 hover:rotate-0 motion-reduce:transition-none">
            <img
              src={asset(images.about)}
              alt={images.aboutAlt}
              width={536}
              height={640}
              loading="lazy"
              className="w-full"
            />
          </div>
        </figure>
        <div>
          <SectionHeading kicker="נעים מאוד" title="אודות" id="about-title" />
          <div className="space-y-4 text-lg leading-relaxed sm:text-xl">
            {artist.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
