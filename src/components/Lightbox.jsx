import { useCallback, useEffect, useRef } from 'react'
import Icon from './Icons.jsx'
import { pauseSmoothScroll, resumeSmoothScroll } from '../lib/smoothScroll.js'

export default function Lightbox({ photos, index, onClose, onIndexChange }) {
  const closeRef = useRef(null)
  const open = index !== null && index >= 0

  const step = useCallback(
    (delta) => {
      const next = (index + delta + photos.length) % photos.length
      onIndexChange(next)
    },
    [index, photos.length, onIndexChange],
  )

  useEffect(() => {
    if (!open) return undefined

    function onKey(event) {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') step(1)
      if (event.key === 'ArrowLeft') step(-1)
    }

    document.addEventListener('keydown', onKey)
    // Freeze the page behind the overlay, then hand focus to the close button.
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    pauseSmoothScroll()
    closeRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
      resumeSmoothScroll()
    }
  }, [open, onClose, step])

  if (!open) return null
  const photo = photos[index]

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer">
      <div className="lightbox__bar">
        <button type="button" className="lightbox__close" onClick={onClose} ref={closeRef}>
          <Icon name="close" size={18} />
          <span>Close</span>
        </button>
        <span className="lightbox__count">
          {index + 1} / {photos.length}
        </span>
      </div>

      <button
        type="button"
        className="lightbox__nav lightbox__nav--prev"
        onClick={() => step(-1)}
        aria-label="Previous photo"
      >
        <Icon name="chevronLeft" size={20} />
      </button>

      <figure className="lightbox__stage">
        <img src={photo.src} alt={photo.alt} />
        <figcaption>
          <strong>{photo.room}</strong> · {photo.alt}
        </figcaption>
      </figure>

      <button
        type="button"
        className="lightbox__nav lightbox__nav--next"
        onClick={() => step(1)}
        aria-label="Next photo"
      >
        <Icon name="chevronRight" size={20} />
      </button>
    </div>
  )
}
