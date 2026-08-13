import Icon from './Icons.jsx'
import { villa } from '../data/villa.js'

// Google's `output=embed` map needs no API key and no script tag.
const embedSrc = `https://www.google.com/maps?q=${villa.map.lat},${villa.map.lng}&z=16&hl=en&output=embed`

export default function Location() {
  return (
    <section className="section" id="location" aria-labelledby="location-heading">
      <h2 id="location-heading">Where you'll be</h2>
      <p className="section__lede">
        {villa.location} · {villa.map.plusCode}
      </p>

      <div className="mapframe">
        <iframe
          title={`Map of ${villa.fullName}`}
          src={embedSrc}
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
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
