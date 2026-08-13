import { useRef } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icons.jsx'
import { stripPhotos, photos, responsive } from '../data/photos.js'

export default function PhotoStrip({ onOpen }) {
  const railRef = useRef(null)

  function scrollBy(direction) {
    const rail = railRef.current
    if (!rail) return
    // One "page" is roughly the visible width, minus a card so context carries over.
    rail.scrollBy({ left: direction * (rail.clientWidth * 0.8), behavior: 'smooth' })
  }

  return (
    <section className="strip" id="photos" aria-labelledby="strip-heading">
      <div className="shell">
        <div className="strip__head">
          <h2 id="strip-heading" className="strip__pill">
            Take a look inside the villa
          </h2>
          <div className="strip__arrows">
            <button type="button" className="iconbtn" onClick={() => scrollBy(-1)} aria-label="Scroll photos left">
              <Icon name="chevronLeft" size={16} />
            </button>
            <button type="button" className="iconbtn" onClick={() => scrollBy(1)} aria-label="Scroll photos right">
              <Icon name="chevronRight" size={16} />
            </button>
          </div>
        </div>

        <div className="strip__rail" ref={railRef}>
          {stripPhotos.map((src) => {
            const meta = photos.find((p) => p.src === src)
            return (
              <button
                key={src}
                type="button"
                className="strip__item"
                onClick={() => onOpen(photos.indexOf(meta))}
                aria-label={`Open photo: ${meta?.alt ?? 'villa'}`}
              >
                <img
                  {...responsive(src, '(max-width: 620px) 78vw, 30vw')}
                  alt={meta?.alt ?? ''}
                  loading="lazy"
                />
              </button>
            )
          })}
        </div>

        <p style={{ marginTop: '1.5rem' }}>
          <Link className="linkbtn linkbtn--strong" to="/photos">
            See all {photos.length} photos <Icon name="chevronRight" size={14} />
          </Link>
        </p>
      </div>
    </section>
  )
}
