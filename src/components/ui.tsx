import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { ArrowIcon } from './Icons'

type Variant = 'plum' | 'sun' | 'paper' | 'brick'

const variants: Record<Variant, string> = {
  plum: 'bg-plum text-white',
  sun: 'bg-sun text-ink',
  paper: 'bg-paper text-ink',
  brick: 'bg-brick-ink text-white',
}

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant
  icon?: ReactNode
  arrow?: boolean
}

/** Chunky hand-drawn button with a hard offset shadow. External links open in a new tab. */
export function LinkButton({ variant = 'plum', icon, arrow, className = '', children, href, ...rest }: LinkButtonProps) {
  const external = href?.startsWith('http')
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`sketch inline-flex min-h-12 items-center justify-center gap-2 border-2 border-ink px-5 py-2.5 text-lg font-bold shadow-hard transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-hard-lg active:translate-y-0.5 active:shadow-hard-sm motion-reduce:transition-none ${variants[variant]} ${className}`}
      {...rest}
    >
      {icon}
      <span>{children}</span>
      {arrow && <ArrowIcon className="size-5 shrink-0" />}
    </a>
  )
}

export function ExternalLink({ href, className = '', children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} {...rest}>
      {children}
    </a>
  )
}

interface SectionHeadingProps {
  kicker: string
  title: string
  id?: string
  onDark?: boolean
}

/** Handwritten kicker above a heavy newspaper headline. */
export function SectionHeading({ kicker, title, id, onDark }: SectionHeadingProps) {
  return (
    <header className="mb-8">
      <p className={`font-hand text-3xl font-bold leading-none ${onDark ? 'text-sun' : 'text-plum-ink'}`}>{kicker}</p>
      <h2
        id={id}
        className={`font-display text-4xl font-black leading-tight sm:text-5xl ${onDark ? 'text-paper' : 'text-ink'}`}
      >
        {title}
      </h2>
      <div aria-hidden className={`mt-3 h-1 w-24 border-y ${onDark ? 'border-paper/60' : 'border-ink'}`} />
    </header>
  )
}

export function Section({
  id,
  labelledBy,
  className = '',
  children,
}: {
  id: string
  labelledBy: string
  className?: string
  children: ReactNode
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`px-4 py-14 sm:px-6 sm:py-20 ${className}`}>
      <div className="mx-auto max-w-5xl">{children}</div>
    </section>
  )
}
