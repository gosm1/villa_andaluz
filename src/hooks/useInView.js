import { useEffect, useRef, useState } from 'react'

/**
 * True once the element has come near the viewport, and true forever after —
 * this gates expensive one-way work (mounting a third-party embed), so it must
 * never flip back and unmount it.
 *
 * `rootMargin` deliberately fires early so the content is ready by the time it
 * is actually looked at.
 */
export function useInView({ rootMargin = '400px' } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (inView) return undefined
    const el = ref.current
    if (!el) return undefined

    // No IntersectionObserver (very old browsers): show the content rather
    // than hiding it forever.
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [inView, rootMargin])

  return [ref, inView]
}
