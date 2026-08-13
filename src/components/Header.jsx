import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Icon from './Icons.jsx'
import { villa } from '../data/villa.js'
import { scrollToHash, pauseSmoothScroll, resumeSmoothScroll } from '../lib/smoothScroll.js'

// `hash` scrolls to a section of the landing page; `to` is its own route.
const NAV = [
  { label: 'The villa', hash: '#about' },
  { label: 'Tour', to: '/tour' },
  { label: 'Photos', hash: '#photos' },
  { label: 'Amenities', hash: '#amenities' },
  { label: 'Location', hash: '#location' },
  { label: 'Contact', hash: '#contact' },
]

export default function Header() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Only the home page has a hero to float over; every other route gets the
  // solid bar straight away. The open drawer counts as "not over the hero":
  // floating leaves the bar transparent with white text, which vanishes against
  // the drawer's cream once the page moves behind it.
  const overHero = pathname === '/' && !scrolled && !menuOpen

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > window.innerHeight * 0.75)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // The drawer covers the page, so lock the body while it's open.
  useEffect(() => {
    if (!menuOpen) return undefined
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    pauseSmoothScroll()
    function onKey(event) {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      resumeSmoothScroll()
      document.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  function goToSection(hash) {
    setMenuOpen(false)
    if (pathname !== '/') {
      navigate('/')
      requestAnimationFrame(() => scrollToHash(hash))
    } else {
      scrollToHash(hash)
    }
  }

  function enquire() {
    goToSection('#contact')
  }

  return (
    <header className={`header ${overHero ? 'header--float' : 'header--solid'}`}>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="header__inner">
        <Link to="/" className="brand">
          <span className="brand__mark">VA</span>
          {villa.name}
        </Link>

        <nav className="header__nav" aria-label="Sections">
          {NAV.map((item) =>
            item.to ? (
              <Link key={item.label} to={item.to} onClick={() => setMenuOpen(false)}>
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.hash}
                onClick={(e) => {
                  e.preventDefault()
                  goToSection(item.hash)
                }}
              >
                {item.label}
              </a>
            ),
          )}
        </nav>

        <div className="header__right">
          <button type="button" className="header__lang">
            EN <Icon name="chevronDown" size={12} />
          </button>
          <button type="button" className="header__cta" onClick={enquire}>
            Enquire
          </button>
          <button
            type="button"
            className="header__burger iconbtn"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} size={18} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="drawer" role="dialog" aria-modal="true" aria-label="Menu">
          <nav className="drawer__nav">
            {NAV.map((item) =>
              item.to ? (
                <Link key={item.label} to={item.to} onClick={() => setMenuOpen(false)}>
                  {item.label}
                </Link>
              ) : (
                <button key={item.label} type="button" onClick={() => goToSection(item.hash)}>
                  {item.label}
                </button>
              ),
            )}
          </nav>
          <div className="drawer__foot">
            <a href={`tel:${villa.contact.phone.replace(/\s/g, '')}`}>{villa.contact.phone}</a>
            <a href={`mailto:${villa.contact.email}`}>{villa.contact.email}</a>
          </div>
        </div>
      )}
    </header>
  )
}
