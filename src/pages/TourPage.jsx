import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// The tour is a self-contained WebGL page in /public/tour — no build step, no
// React. Framing it keeps that engine untouched and keeps its 1.9 MB of photos
// off the landing page: nothing here loads until someone opens /tour.
export default function TourPage() {
  const navigate = useNavigate()

  // The tour manages its own fullscreen layout, so the page behind it must not
  // scroll while it's mounted.
  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [])

  // Both tour buttons post up rather than navigating the frame themselves.
  useEffect(() => {
    function onMessage(event) {
      // Same-origin only: the tour is served from our own /public.
      if (event.origin !== window.location.origin) return
      if (event.data?.source !== 'villa-tour') return
      if (event.data.type === 'enquire') navigate('/#contact')
      if (event.data.type === 'exit') navigate('/')
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [navigate])

  return (
    <div className="tourpage">
      <iframe
        src="/tour/index.html"
        title="Interactive tour of Villa Andaluz"
        allow="fullscreen"
      />
    </div>
  )
}
