import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'

import React from 'react'

const App = () => {
  return (
    <div className="min-h-screen bg-black text-white ">
      <Navbar />
      <main>
        <Hero />
      </main>
    </div>
  )
}

export default App

