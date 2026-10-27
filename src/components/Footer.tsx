import { artist, images } from '../data/content'
import { asset } from '../lib/asset'
import { SocialIcons } from './SocialIcons'

export function Footer({ year = new Date().getFullYear() }: { year?: number }) {
  return (
    <footer className="bg-navy px-4 py-12 text-paper sm:px-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-start">
        <div className="flex items-center gap-3">
          <img src={asset(images.boatMark)} alt="" width={56} height={56} loading="lazy" className="size-14 rounded-full border-2 border-paper" />
          <div>
            <p className="font-display text-3xl font-bold">{artist.name}</p>
            <p lang="en" className="text-sm text-paper/80">
              {artist.nameEn}
            </p>
          </div>
        </div>

        <SocialIcons onDark className="justify-center" />

        <div className="text-sm text-paper/80">
          {artist.contactEmail && (
            <p className="mb-1">
              להופעות והזמנות:{' '}
              <a href={`mailto:${artist.contactEmail}`} className="on-dark font-semibold text-paper underline">
                {artist.contactEmail}
              </a>
            </p>
          )}
          <p>
            © {year} {artist.name}
          </p>
        </div>
      </div>
    </footer>
  )
}
