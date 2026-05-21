import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import CalcularTempo from './pages/CalcularTempo';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CaronasPage from './pages/Caronas/Caronas';

export default function App() {
  return (
    <BrowserRouter>

      <div className="flex flex-col min-h-screen bg-[#F8FAFC]">

        {/* Navbar */}
        <Navbar />

        {/* Conteúdo */}
        <main className="flex-1">

          <Routes>

            {/* Página de Caronas */}
            <Route
              path="/caronas"
              element={<CaronasPage />}
            />

            {/* Página calcular tempo */}
            <Route
              path="/calcular-tempo"
              element={<CalcularTempo />}
            />

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