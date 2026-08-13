import { Link } from 'react-router-dom'
import { villa } from '../data/villa.js'

const COLUMNS = [
  { title: 'The villa', links: [['Photo tour', '/photos'], ['Amenities', '/'], ['House rules', '/'], ['Availability', '/']] },
  { title: 'The area', links: [['Cabo Negro', '/'], ['Tétouan', '/'], ['Beaches nearby', '/'], ['Getting here', '/']] },
  { title: 'Contact', links: [['Enquire', '/'], ['House rules', '/'], ['Long stays', '/'], ['WhatsApp', '/']] },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer__top">
          <div>
            <p className="footer__brand">{villa.fullName}</p>
            <p className="footer__tag">
              A modern {villa.plotSize} villa with private pool, five minutes from the coast.
            </p>
          </div>
          <div className="footer__cols">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h3>{col.title}</h3>
                <ul>
                  {col.links.map(([label, to]) => (
                    <li key={label}>
                      <Link to={to}>{label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="footer__bar">
          <p>
            © {new Date().getFullYear()} {villa.fullName} · {villa.location}
          </p>
          <p>Enquiries answered directly by the host. No booking fees.</p>
        </div>
      </div>
    </footer>
  )
}
