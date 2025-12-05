import React from 'react'

import Show from './Show'
import Navbar from './Navbar'
import Hero from './Hero'
import Features from './Features'
import HowItWorks from './HowItWorks'
import DemoCard from './DemoCard'
import Footer from './Footer'
const Animation = () => {
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <HowItWorks />
        <DemoCard />
        <Show />
      </main>
      <Footer />
    </div>
  )
}

export default Animation