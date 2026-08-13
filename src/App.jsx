import { useEffect, lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'

// Split out of the landing bundle: most visitors never open either, and the
// JS for both was being parsed before the hero could paint.
const GalleryPage = lazy(() => import('./pages/GalleryPage.jsx'))
const TourPage = lazy(() => import('./pages/TourPage.jsx'))
import { startSmoothScroll, stopSmoothScroll, scrollToTarget, scrollToHash } from './lib/smoothScroll.js'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  // Block body, not a concise arrow: an arrow would return scrollTo's value,
  // which React then treats as the effect's cleanup function and calls on the
  // next navigation — that crashed the whole tree on every route change.
  useEffect(() => {
    // A hash means the navigation was aimed at a section — the tour's Enquire
    // button sends us to /#contact — so honour it instead of jumping to the top.
    if (hash) {
      // One frame's grace for the incoming route to mount its sections.
      requestAnimationFrame(() => scrollToHash(hash))
      return
    }
    scrollToTarget(0, { immediate: true })
  }, [pathname, hash])
  return null
}

export default function App() {
  // The tour fills the viewport and carries its own chrome — the site header
  // and footer would sit on top of it and give it a second way to scroll.
  const bare = useLocation().pathname === '/tour'

  // The tour has no page scroll of its own, and Lenis' wheel capture would eat
  // the drag gestures inside its iframe, so it only runs on the scrolling pages.
  useEffect(() => {
    if (bare) {
      stopSmoothScroll()
      return undefined
    }
    startSmoothScroll()
    return stopSmoothScroll
  }, [bare])

  return (
    <>
      <ScrollToTop />
      {!bare && <Header />}
      <main id="main">
        {/* Home is bundled, so it never suspends; the fallback only ever shows
            while a lazy route's chunk is in flight. */}
        <Suspense fallback={<div className="routeloading" aria-busy="true" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/photos" element={<GalleryPage />} />
            <Route path="/tour" element={<TourPage />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </main>
      {!bare && <Footer />}
    </>
  )
}
