import { socials as defaultSocials, type SocialLink } from '../data/content'
import { socialIcons } from './Icons'

interface SocialIconsProps {
  socials?: SocialLink[]
  onDark?: boolean
  className?: string
}

export function SocialIcons({ socials = defaultSocials, onDark, className = '' }: SocialIconsProps) {
  return (
    <ul className={`flex flex-wrap items-center gap-3 ${className}`}>
      {socials.map(({ network, label, href }) => {
        const Icon = socialIcons[network]
        return (
          <li key={network}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              title={label}
              className={`flex size-11 items-center justify-center rounded-full border-2 transition-[transform,background-color] duration-150 hover:-translate-y-0.5 motion-reduce:transition-none ${
                onDark
                  ? 'on-dark border-paper text-paper hover:bg-paper hover:text-navy'
                  : 'border-ink bg-paper text-ink shadow-hard-sm hover:bg-sun'
              }`}
            >
              <Icon className="size-5" />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
