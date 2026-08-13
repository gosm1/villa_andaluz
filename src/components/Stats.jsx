import { statsPhoto } from '../data/photos.js'
import { villa } from '../data/villa.js'

export default function Stats() {
  return (
    <section className="stats" aria-label="The villa in numbers">
      <div className="stats__img">
        <img src={statsPhoto} alt="Lounge with sofa bed and garden view" loading="lazy" />
      </div>
      <div className="stats__panel">
        {villa.stats.map((stat) => (
          <div key={stat.label}>
            <span className="stats__value">
              {stat.value}
              {stat.unit && <sup>{stat.unit}</sup>}
            </span>
            <span className="stats__label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
