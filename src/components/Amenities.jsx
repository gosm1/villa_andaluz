import { useState } from 'react'
import Icon from './Icons.jsx'
import { villa } from '../data/villa.js'

const PREVIEW_COUNT = 8

export default function Amenities() {
  const [expanded, setExpanded] = useState(false)
  const shown = expanded ? villa.amenities : villa.amenities.slice(0, PREVIEW_COUNT)

  return (
    <section className="section" id="amenities" aria-labelledby="amenities-heading">
      <h2 id="amenities-heading">What this place offers</h2>
      <ul className="amenities">
        {shown.map((a) => (
          <li key={a.label}>
            <Icon name={a.icon} size={22} />
            {a.label}
          </li>
        ))}
      </ul>

      <button type="button" className="btn btn--outline" onClick={() => setExpanded(!expanded)}>
        {expanded ? 'Show less' : `Show all ${villa.amenityTotal} amenities`}
      </button>
    </section>
  )
}
