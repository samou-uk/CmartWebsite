import { useEffect, useState } from 'react'

interface FloatWordCycleProps {
  words: string[]
  className?: string
  typingMs?: number
  holdMs?: number
  deletingMs?: number
}

export default function FloatWordCycle({
  words,
  className = '',
  typingMs = 55,
  holdMs = 1800,
  deletingMs = 35,
}: FloatWordCycleProps) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    setText('')
    setDeleting(false)
    setIndex(0)
  }, [words.join('\0')])

  useEffect(() => {
    if (!words.length) return

    if (reducedMotion) {
      setText(words[index % words.length])
      const id = window.setInterval(() => {
        setIndex((i) => (i + 1) % words.length)
      }, holdMs)
      return () => window.clearInterval(id)
    }

    const current = words[index % words.length]

    if (!deleting && text === current) {
      const id = window.setTimeout(() => setDeleting(true), holdMs)
      return () => window.clearTimeout(id)
    }

    if (deleting && text === '') {
      setDeleting(false)
      setIndex((i) => (i + 1) % words.length)
      return
    }

    const id = window.setTimeout(
      () => {
        setText((prev) =>
          deleting ? current.slice(0, Math.max(0, prev.length - 1)) : current.slice(0, prev.length + 1)
        )
      },
      deleting ? deletingMs : typingMs
    )

    return () => window.clearTimeout(id)
  }, [words, index, text, deleting, typingMs, holdMs, deletingMs, reducedMotion])

  useEffect(() => {
    if (reducedMotion && words.length) {
      setText(words[index % words.length] || '')
    }
  }, [index, reducedMotion, words])

  if (!words.length) return null

  return (
    <span className={`inline-block ${className}`} aria-live="polite">
      {text}
      {!reducedMotion && (
        <span
          className="ml-0.5 inline-block w-[0.08em] h-[0.85em] translate-y-[0.08em] bg-current align-baseline animate-pulse"
          aria-hidden
        />
      )}
    </span>
  )
}
