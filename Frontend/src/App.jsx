import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Loader from './components/Loader'
import BackToTop from './components/BackToTop'
import CursorFollower from './components/ui/CursorFollower'
import Home from './pages/Home'
import AboutPage from './pages/AboutPage'
import ProgramsPage from './pages/ProgramsPage'
import TrainersPage from './pages/TrainersPage'
import MembershipPage from './pages/MembershipPage'
import GalleryPage from './pages/GalleryPage'
import ContactPage from './pages/ContactPage'
// import fallingStars from './assets/falling-stars.gif'
import {FallingLeaves} from 'falling-leaves/react'
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

(async () => {
  // 1. Register all slim bundle features on the engine
  await loadSlim(tsParticles);

  // 2. Create the animation
  await tsParticles.load({
    id: "tsparticles", // HTML container ID
    options: {
      background: {
        color: "#0b1020",
      },
      particles: {
        number: { value: 80 },
        links: {
          enable: true,
          distance: 150,
          opacity: 0.35,
        },
        move: {
          enable: true,
          speed: 2,
        },
      },
    },
  });
})();



const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return null
}

const App = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-[#050505] text-white" id="tsparticles">
      <FallingLeaves fullScreen  shapes={["maple"]} />
      
      <Loader hidden={!loading} />
      <CursorFollower />
      <Navbar />
      <ScrollToTop />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/trainers" element={<TrainersPage />} />
          <Route path="/membership" element={<MembershipPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}

export default App
