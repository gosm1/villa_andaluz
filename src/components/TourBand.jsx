import { Link } from 'react-router-dom'
import Icon from './Icons.jsx'
import { tourPhoto } from '../data/photos.js'
import { villa } from '../data/villa.js'

export default function TourBand() {
  const [before, accent, after] = villa.tour.title

  return (
    <section className="tourband" id="tour" aria-labelledby="tour-heading">
      <img className="tourband__bg" src={tourPhoto} alt="" aria-hidden="true" loading="lazy" />

      <div className="shell tourband__inner">
        <p className="eyebrow tourband__eyebrow">{villa.tour.eyebrow}</p>
        <h2 id="tour-heading" className="tourband__title">
          {before}
          <em className="serif-italic">{accent}</em>
          {after}
        </h2>
        <p className="tourband__body">{villa.tour.body}</p>

        <Link className="btn btn--ghost" to="/tour">
          {villa.tour.cta}
          <Icon name="chevronRight" size={14} />
        </Link>

        <ul className="tourband__meta">
          {villa.tour.meta.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
