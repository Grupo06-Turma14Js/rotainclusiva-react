import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/navbar/navbar'
import Footer from './components/footer/footer'
import CalcularTempo from './pages/CalcularTempo'
import Home from './pages/Home'
import { Sobre } from './pages/Sobre'
import Acessibilidade from './pages/Acessibilidade'


export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calcular-tempo" element={<CalcularTempo />} />
            <Route path="/home" element={<Home />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/acessibilidades" element={<Acessibilidade />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}