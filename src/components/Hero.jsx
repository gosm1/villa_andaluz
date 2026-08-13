import { useEffect, useState } from 'react'
import Icon from './Icons.jsx'
import { heroSlides, responsive } from '../data/photos.js'
import { villa } from '../data/villa.js'
import { scrollToHash } from '../lib/smoothScroll.js'

const INTERVAL = 7000

export default function Hero() {
  const [before, accent, after] = villa.hero.line1
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % heroSlides.length), INTERVAL)
    return () => clearInterval(id)
  }, [])

  function scrollOn() {
    scrollToHash('#about')
  }

  return (
    <section className="hero" aria-label="Introduction">
      <div className="hero__stage" aria-hidden="true">
        {heroSlides.map((slide, i) => (
          <img
            key={slide.src}
            className={`hero__img ${i === active ? 'is-active' : ''}`}
            // Full-bleed, so it is always the viewport width.
            {...responsive(slide.src, '100vw')}
            alt=""
            fetchpriority={i === 0 ? 'high' : 'low'}
            // The night slide is not shown for 7s; letting it compete with the
            // LCP image for bandwidth delayed the first paint for nothing.
            loading={i === 0 ? 'eager' : 'lazy'}
            decoding={i === 0 ? 'sync' : 'async'}
          />
        ))}
      </div>

      <div className="hero__content">
        <p className="hero__kicker">{villa.hero.kicker}</p>
        <h1 className="hero__title">
          {before}
          <em className="serif-italic">{accent}</em>
          {after}
        </h1>
        <p className="hero__sub">
          {villa.guests} guests · {villa.bedrooms} bedrooms · {villa.baths} bathrooms · private pool
        </p>
        <button type="button" className="btn btn--ghost" onClick={scrollOn}>
          {villa.hero.cta}
        </button>
      </div>

      <div className="hero__dots">
        {heroSlides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            className={i === active ? 'is-active' : ''}
            onClick={() => setActive(i)}
            aria-label={`Show the villa ${slide.label.toLowerCase()}`}
            aria-current={i === active}
          >
            <span>{slide.label}</span>
          </button>
        ))}
      </div>

      <button type="button" className="hero__scroll" onClick={scrollOn} aria-label="Scroll to content">
        <Icon name="chevronDown" size={26} />
      </button>
    </section>
  )
}
