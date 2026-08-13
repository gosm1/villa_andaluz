import { useState } from 'react'
import Hero from '../components/Hero.jsx'
import About from '../components/About.jsx'
import Statement from '../components/Statement.jsx'
import Stats from '../components/Stats.jsx'
import HouseDetails from '../components/HouseDetails.jsx'
import PhotoStrip from '../components/PhotoStrip.jsx'
import Lightbox from '../components/Lightbox.jsx'
import TourBand from '../components/TourBand.jsx'
import Amenities from '../components/Amenities.jsx'
import Location from '../components/Location.jsx'
import Enquire from '../components/Enquire.jsx'
import Icon from '../components/Icons.jsx'
import { photos } from '../data/photos.js'
import { villa } from '../data/villa.js'

export default function Home() {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  return (
    <>
      <Hero />
      <About />
      <Statement />
      <Stats />
      <HouseDetails />
      <PhotoStrip onOpen={setLightboxIndex} />

      <Lightbox
        photos={photos}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
      />

      <TourBand />

      <div className="shell">
        <section className="section" aria-labelledby="sleeping-heading">
          <h2 id="sleeping-heading">Where you'll sleep</h2>
          <p className="section__lede">
            {villa.beds} beds across {villa.bedrooms} bedrooms, plus a sofa bed in each of the three
            lounges.
          </p>
          <ul className="sleeping">
            {villa.bedroomsDetail.map((room) => (
              <li key={room.name}>
                <Icon name="bed" size={22} />
                <strong>{room.name}</strong>
                <span>{room.beds}</span>
              </li>
            ))}
          </ul>
        </section>

        <Amenities />
        <Location />

        <section className="section" aria-labelledby="know-heading">
          <h2 id="know-heading">Good to know</h2>
          <div className="know">
            <div>
              <h3>House rules</h3>
              <ul>
                {villa.houseRules.map((rule) => (
                  <li key={rule}>{rule}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Safety &amp; property</h3>
              <ul>
                {villa.safety.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Your host</h3>
              <ul>
                <li>{villa.host.name}, lives in {villa.host.livesIn}</li>
                <li>Responds {villa.host.responseTime}, {villa.host.responseRate}% response rate</li>
                <li>Speaks {villa.host.languages.join(', ')}</li>
              </ul>
              <p className="know__shield">
                <Icon name="shield" size={18} /> Staff on site to hand over the keys.
              </p>
            </div>
          </div>
        </section>
      </div>

      <Enquire />
    </>
  )
}
