import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/navbar/navbar'
import Footer from './components/footer/footer'
import CalcularTempo from './pages/CalcularTempo'

export default function App() {
  return (
    <BrowserRouter>

      <div className="flex flex-col min-h-screen bg-[#F8FAFC]">

        {/* Navbar */}
        <Navbar />

        {/* Conteúdo */}
        <main className="flex-1">

          <Routes>
            <Route path="/calcular-tempo" element={<CalcularTempo />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />

        {/* Toasts */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          theme="light"
        />
      </div>
    </BrowserRouter>
  );
}