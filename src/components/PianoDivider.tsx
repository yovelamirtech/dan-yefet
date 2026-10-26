import { useId } from 'react'

const WHITE = 16
const HEIGHT = 30
// Black keys sit after these white keys in every octave (C#, D#, F#, G#, A#).
const BLACK_AFTER = [0, 1, 3, 4, 5]

/** A strip of piano keys used as a section divider. Purely decorative. */
export function PianoDivider({ className = '' }: { className?: string }) {
  const id = useId()
  const octave = WHITE * 7
  return (
    <div aria-hidden className={`border-y-2 border-ink bg-white ${className}`}>
      <svg width="100%" height={HEIGHT} className="block">
        <defs>
          <pattern id={id} width={octave} height={HEIGHT} patternUnits="userSpaceOnUse">
            {Array.from({ length: 7 }, (_, i) => (
              <rect key={`w${i}`} x={i * WHITE} y={0} width={WHITE} height={HEIGHT} fill="#fff" stroke="#1b1b1f" strokeWidth={1.5} />
            ))}
            {BLACK_AFTER.map((i) => (
              <rect key={`b${i}`} x={(i + 1) * WHITE - 5} y={0} width={10} height={HEIGHT * 0.6} rx={1.5} fill="#1b1b1f" />
            ))}
          </pattern>
        </defs>
        <rect width="100%" height={HEIGHT} fill={`url(#${id})`} />
      </svg>
    </div>
  )
}
