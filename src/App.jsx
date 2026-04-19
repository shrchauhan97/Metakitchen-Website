import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Nav from './components/Nav/Nav.jsx'
import Footer from './components/Footer/Footer.jsx'
import Home from './pages/Home/Home.jsx'
import OurBread from './pages/OurBread/OurBread.jsx'
import DrAara from './pages/DrAara/DrAara.jsx'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/our-bread" element={<OurBread />} />
        <Route path="/dr-aara" element={<DrAara />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <AnimatedRoutes />
      <Footer />
    </BrowserRouter>
  )
}
