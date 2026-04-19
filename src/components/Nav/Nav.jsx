import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import './Nav.css'

const links = [
  { label: 'Our Bread', to: '/our-bread' },
  { label: 'Dr. Aara', to: '/dr-aara' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <motion.nav
        className={`nav ${scrolled ? 'nav--scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="nav__inner">
          <Link to="/" className="nav__logo">
            <img src="https://metakitchen.io/wp-content/uploads/2026/02/ChatGPT-Image-Feb-19-2026-10_25_48-AM-e1771477345602.png" alt="MetaKitchen" />
          </Link>

          <ul className="nav__links">
            {links.map(link => (
              <li key={link.to}>
                <NavLink to={link.to} className={({ isActive }) => `nav__link ${isActive ? 'nav__link--active' : ''}`}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="nav__actions">
            <Link to="/our-bread" className="nav__cta">Get Started</Link>
            <button className="nav__burger" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="nav__mobile"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <ul className="nav__mobile-links">
              {links.map((link, i) => (
                <motion.li key={link.to} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 + 0.1 }}>
                  <NavLink to={link.to} className="nav__mobile-link">{link.label}</NavLink>
                </motion.li>
              ))}
              <motion.li initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: links.length * 0.08 + 0.1 }}>
                <Link to="/our-bread" className="nav__mobile-cta">Get Started</Link>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
