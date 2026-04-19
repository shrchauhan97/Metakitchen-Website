import { Link } from 'react-router-dom'
import './Footer.css'

const productLinks = [
  { label: 'Our Bread', to: '/our-bread' },
  { label: 'Dr. Aara', to: '/dr-aara' },
]
const companyLinks = [
  { label: 'The Science', to: '/our-bread' },
  { label: 'For Doctors', to: '/our-bread' },
]
const legalLinks = [
  { label: 'Privacy', to: '/' },
  { label: 'Terms', to: '/' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <img src="https://metakitchen.io/wp-content/uploads/2026/02/ChatGPT-Image-Feb-19-2026-10_25_48-AM-e1771477345602.png" alt="MetaKitchen" className="footer__logo" />
            <p className="footer__tagline">Making metabolic health effortless through foods people already love.</p>
            <a href="mailto:hello@evva.enterprises" className="footer__email">hello@evva.enterprises</a>
          </div>
          <div className="footer__nav">
            {[['Product', productLinks], ['Company', companyLinks], ['Legal', legalLinks]].map(([title, items]) => (
              <div key={title} className="footer__col">
                <h5>{title}</h5>
                <ul>
                  {items.map(l => <li key={l.label}><Link to={l.to}>{l.label}</Link></li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="footer__bottom">
          <p>© 2026 EVAA Pte. Ltd. · Singapore</p>
          <p className="footer__gi"><span className="stat">GI: 38</span> — Clinically Validated</p>
        </div>
      </div>
    </footer>
  )
}
