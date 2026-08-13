import { villa } from '../data/villa.js'

function Column({ title, items }) {
  return (
    <div className="details__col">
      <h3>{title}</h3>
      <ul className="details__list">
        {items.map((item) => (
          <li key={item.text}>
            {item.lead && <span className="details__lead">{item.lead}</span>}
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function HouseDetails() {
  return (
    <section className="details" aria-label="Inside and outside the house">
      <div className="shell details__grid">
        <Column title="Inside the house" items={villa.inside} />
        <Column title="Outside the house" items={villa.outside} />
      </div>
    </section>
  )
}
