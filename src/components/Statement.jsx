import Icon from './Icons.jsx'
import { villa } from '../data/villa.js'
import { scrollToHash } from '../lib/smoothScroll.js'

export default function Statement() {
  return (
    <section className="statement" aria-labelledby="statement-heading">
      <div className="shell statement__inner">
        <div className="statement__head">
          <h2 id="statement-heading" className="statement__title">
            {villa.statement.title}
          </h2>
          <p className="statement__sub">{villa.statement.subtitle}</p>
        </div>

        <div className="statement__row">
          <p>{villa.statement.body}</p>
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => scrollToHash('#contact')}
          >
            {villa.statement.cta}
            <Icon name="chevronRight" size={14} />
          </button>
        </div>

        <div className="statement__foot">
          <span>Hosted by {villa.host.name} · Superhost · responds {villa.host.responseTime}</span>
          <span>{villa.location}</span>
        </div>
      </div>
    </section>
  )
}
