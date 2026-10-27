import { artist, images, links } from '../data/content'
import { asset } from '../lib/asset'
import { AppleMusicIcon, SpotifyIcon } from './Icons'
import { SocialIcons } from './SocialIcons'
import { LinkButton } from './ui'

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="overflow-hidden bg-navy text-paper">
      <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 pt-8 pb-14 sm:px-6 md:grid-cols-[1.1fr_1fr] md:pt-14 md:pb-20">
        <div className="text-center md:text-start">
          <img
            src={asset(images.boat)}
            alt=""
            width={637}
            height={530}
            fetchPriority="high"
            className="mx-auto w-44 origin-bottom motion-safe:animate-rock sm:w-52 md:mx-0 md:-ms-4"
          />
          <h1 id="hero-title" className="mt-1 font-display text-8xl leading-[0.9] font-bold sm:text-9xl">
            {artist.name}
          </h1>
          <p className="mt-2 font-hand text-4xl font-bold text-sun sm:text-5xl">{artist.tagline}</p>

          <div className="mt-7 flex flex-wrap justify-center gap-4 md:justify-start">
            <LinkButton href={links.spotify.href} variant="sun" icon={<SpotifyIcon className="size-6" />}>
              להאזנה
            </LinkButton>
            <LinkButton href={links.appleMusic.href} variant="paper" icon={<AppleMusicIcon className="size-5" />}>
              {links.appleMusic.label}
            </LinkButton>
          </div>

          <SocialIcons onDark className="mt-7 justify-center md:justify-start" />
        </div>

        <figure className="relative mx-auto w-full max-w-xs md:max-w-sm">
          <div className="print -rotate-2 bg-white">
            <img
              src={asset(images.heroPortrait)}
              alt={images.heroPortraitAlt}
              width={640}
              height={640}
              className="aspect-square w-full object-cover"
            />
          </div>
          <span
            aria-hidden
            className="absolute inset-x-0 -top-3 mx-auto h-7 w-24 rotate-3 bg-sun/80"
          />
        </figure>
      </div>
    </section>
  )
}
