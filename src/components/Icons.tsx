import type { SVGProps } from 'react'
import type { SocialNetwork } from '../data/content'

type IconProps = SVGProps<SVGSVGElement>

const base = (props: IconProps): IconProps => ({
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  'aria-hidden': true,
  focusable: false,
  ...props,
})

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...base(props)} fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function TikTokIcon(props: IconProps) {
  return (
    <svg {...base(props)} fill="currentColor">
      <path d="M16.2 2.5c.3 2.5 1.8 4.1 4.3 4.3v3.4a7.6 7.6 0 0 1-4.2-1.3v6.4a6 6 0 1 1-6-6c.3 0 .7 0 1 .1v3.5a2.6 2.6 0 1 0 1.6 2.4V2.5h3.3Z" />
    </svg>
  )
}

export function YouTubeIcon(props: IconProps) {
  return (
    <svg {...base(props)} fill="currentColor">
      <path d="M21.6 7.2a2.6 2.6 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4a2.6 2.6 0 0 0-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.8a2.6 2.6 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.6 2.6 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8ZM10 15V9l5.2 3L10 15Z" />
    </svg>
  )
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg {...base(props)} fill="currentColor">
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4a21 21 0 0 0-2.3-.1c-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1Z" />
    </svg>
  )
}

export function SpotifyIcon(props: IconProps) {
  return (
    <svg {...base(props)} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <circle cx="12" cy="12" r="9.5" />
      <path d="M7 9.3c3.5-1 7.3-.7 10.2.9" />
      <path d="M7.6 12.4c2.9-.8 5.9-.5 8.3.8" />
      <path d="M8.2 15.3c2.2-.6 4.4-.4 6.3.6" />
    </svg>
  )
}

export function AppleMusicIcon(props: IconProps) {
  return (
    <svg {...base(props)} fill="none" stroke="currentColor" strokeWidth={2} strokeLinejoin="round">
      <path d="M9 17.5V6.2l10-2.2v11.3" />
      <circle cx="6.5" cy="17.5" r="2.5" fill="currentColor" />
      <circle cx="16.5" cy="15.3" r="2.5" fill="currentColor" />
    </svg>
  )
}

/** Points "forward". In RTL forward is left, so it is mirrored with rtl:-scale-x-100. */
export function ArrowIcon({ className = '', ...props }: IconProps) {
  return (
    <svg
      {...base(props)}
      className={`rtl:-scale-x-100 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

/** Play triangle. Media controls keep their LTR direction even in RTL. */
export function PlayIcon(props: IconProps) {
  return (
    <svg {...base(props)} fill="currentColor">
      <path d="M8 5.5v13a1 1 0 0 0 1.5.9l10.2-6.5a1 1 0 0 0 0-1.8L9.5 4.6A1 1 0 0 0 8 5.5Z" />
    </svg>
  )
}

export function MenuIcon({ open, ...props }: IconProps & { open: boolean }) {
  return (
    <svg {...base(props)} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
      {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
    </svg>
  )
}

export const socialIcons: Record<SocialNetwork, (props: IconProps) => React.JSX.Element> = {
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
  youtube: YouTubeIcon,
  facebook: FacebookIcon,
  spotify: SpotifyIcon,
  appleMusic: AppleMusicIcon,
}
