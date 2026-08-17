import { Fragment } from 'react'

interface CategoryTickerProps {
  items: string[]
  className?: string
}

export default function CategoryTicker({ items, className = '' }: CategoryTickerProps) {
  if (!items.length) return null

  // Repeat enough for a seamless -50% loop on wide screens
  const sequence = [...items, ...items, ...items, ...items]
  const track = [...sequence, ...sequence]

  return (
    <div className={`fs-ticker ${className}`.trim()} aria-hidden="true">
      <div className="fs-ticker-track">
        {track.map((label, index) => (
          <Fragment key={`${label}-${index}`}>
            <span
              className={`fs-ticker-word ${index % 2 === 0 ? 'is-solid' : 'is-outline'}`}
            >
              {label}
            </span>
            <span className="fs-ticker-mark" />
          </Fragment>
        ))}
      </div>
    </div>
  )
}
