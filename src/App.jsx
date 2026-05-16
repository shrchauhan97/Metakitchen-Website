import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { HelmetProvider } from 'react-helmet-async'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import Nav from './components/Nav/Nav.jsx'
import Footer from './components/Footer/Footer.jsx'
import ScrollToTop from './components/ScrollToTop/ScrollToTop.jsx'
import Home from './pages/Home/Home.jsx'
import OurBread from './pages/OurBread/OurBread.jsx'
import DrAara from './pages/DrAara/DrAara.jsx'
import Science from './pages/Science/Science.jsx'
import Story from './pages/Story/Story.jsx'
import Privacy from './pages/Privacy/Privacy.jsx'
import Terms from './pages/Terms/Terms.jsx'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/our-bread" element={<OurBread />} />
        <Route path="/dr-aara" element={<DrAara />} />
        <Route path="/science" element={<Science />} />
        <Route path="/story" element={<Story />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Nav />
        <AnimatedRoutes />
        <Footer />
        <Analytics />
        <SpeedInsights />
      </BrowserRouter>
    </HelmetProvider>
  )
}
