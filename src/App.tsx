import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Navbar from './components/navbar/navbar'
import Footer from './components/footer/footer'
import Caronas from './pages/Caronas/Caronas'
import CalcularTempo from './pages/calculartempo/CalcularTempo'
import Home from './pages/home/Home'
import { Sobre } from './pages/sobre/Sobre'
import Acessibilidade from './pages/acessibilidade/Acessibilidade'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sobre' element={<Sobre />} />
        <Route path='/caronas' element={<Caronas />} />
        <Route path='/calcular-tempo' element={<CalcularTempo />} />
        <Route path='/acessibilidade' element={<Acessibilidade />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}