import { useState } from 'react'
import Icon from './Icons.jsx'
import { villa } from '../data/villa.js'
import { useInView } from '../hooks/useInView.js'

// Google's `output=embed` map needs no API key and no script tag.
const embedSrc = `https://www.google.com/maps?q=${villa.map.lat},${villa.map.lng}&z=16&hl=en&output=embed`

export default function Location() {
  // The embed pulls roughly 1.4 MB of Google's own JavaScript and runs it on
  // the main thread. Mounted eagerly it dominated Total Blocking Time on a
  // mid-range phone, for a map most visitors never scroll to. It now mounts
  // only once it approaches the viewport, or when asked for.
  const [mapRef, near] = useInView({ rootMargin: '300px' })
  const [asked, setAsked] = useState(false)
  const showMap = near || asked

  return (
    <section className="section" id="location" aria-labelledby="location-heading">
      <h2 id="location-heading">Where you'll be</h2>
      <p className="section__lede">
        {villa.location} · {villa.map.plusCode}
      </p>

      <div className="mapframe" ref={mapRef}>
        {showMap ? (
          <iframe
            title={`Map of ${villa.fullName}`}
            src={embedSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : (
          <button type="button" className="mapframe__placeholder" onClick={() => setAsked(true)}>
            <Icon name="map" size={26} />
            <span className="mapframe__place">{villa.location}</span>
            <span className="mapframe__hint">Show map</span>
          </button>
        )}
      </div>

      <p className="mapframe__link">
        <a href={villa.map.link} target="_blank" rel="noreferrer" className="linkbtn linkbtn--strong">
          Open in Google Maps <Icon name="chevronRight" size={14} />
        </a>
      </p>

      <p className="prose">
        A strategic spot on the IKEA road, just 400 metres from La Cassia. The villa sits directly on
        the main street, close to the popular cafés and restaurants and right next door to Cappoccino.
      </p>

      <ul className="nearby">
        {villa.nearby.map((place) => (
          <li key={place.name}>
            <Icon name="map" size={20} />
            <div>
              <p className="nearby__name">{place.name}</p>
              <p className="nearby__detail">{place.detail}</p>
            </div>
            <span className="nearby__time">{place.time}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
