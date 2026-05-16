import { Link } from 'react-router-dom'
import { BRAND } from '../../data/content.js'
import './Footer.css'

const productLinks = [
  { label: 'Our Bread', to: '/our-bread' },
  { label: 'Dr. Aara', to: '/dr-aara' },
]
const companyLinks = [
  { label: 'The Science', to: '/science' },
  { label: 'The Story', to: '/story' },
]
const legalLinks = [
  { label: 'Privacy', to: '/privacy' },
  { label: 'Terms', to: '/terms' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <img
              src="/img/mk-logo-original.png"
              alt="MetaKitchen"
              className="footer__logo"
              loading="lazy"
            />
            <p className="footer__tagline">{BRAND.shortDesc}</p>
            <a href={`mailto:${BRAND.email}`} className="footer__email">
              {BRAND.email}
            </a>
          </div>
          <div className="footer__nav">
            {[
              ['Product', productLinks],
              ['Company', companyLinks],
              ['Legal', legalLinks],
            ].map(([title, items]) => (
              <div key={title} className="footer__col">
                <h5>{title}</h5>
                <ul>
                  {items.map((l) => (
                    <li key={l.label}>
                      <Link to={l.to}>{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="footer__bottom">
          <p>
            © 2026 MetaKitchen · Made in India
          </p>
        </div>
      </div>
    </footer>
  )
}
