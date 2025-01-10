import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar'
import Footer from './components/footer'
import { SpeedInsights } from '@vercel/speed-insights/react'


function App() {

  return (
<div className="bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]">

    <Navbar/>
    <Footer/>
<SpeedInsights/>
</div>
  )
}

export default App
