import { aboutPhoto } from '../data/photos.js'
import { villa } from '../data/villa.js'

const FACTS = [
  { value: villa.guests, label: 'Guests' },
  { value: villa.bedrooms, label: 'Bedrooms' },
  { value: villa.beds, label: 'Beds' },
  { value: villa.baths, label: 'Bathrooms' },
]

export default function About() {
  // Odd indexes in the heading array are the words set in italic serif.
  const heading = villa.about.heading.map((part, i) =>
    i % 2 === 1 ? (
      <em key={part} className="serif-italic">
        {part}
      </em>
    ) : (
      <span key={part + i}>{part}</span>
    ),
  )

  return (
    <section className="about" id="about" aria-labelledby="about-heading">
      <div className="shell about__grid">
        <div>
          <p className="eyebrow">About the villa</p>
          <h2 id="about-heading" className="about__title">
            {heading}
          </h2>
          <div className="about__body">
            {villa.about.body.map((p) => (
              <p key={p.slice(0, 20)}>{p}</p>
            ))}
          </div>
          <div className="about__facts">
            {FACTS.map((fact) => (
              <div className="about__fact" key={fact.label}>
                <strong>{fact.value}</strong>
                <span>{fact.label}</span>
              </div>
            ))}
          </div>
        </div>

        <figure className="about__figure">
          <img src={aboutPhoto} alt="The private pool at the centre of the garden" loading="lazy" />
        </figure>
      </div>
    </section>
  )
}
