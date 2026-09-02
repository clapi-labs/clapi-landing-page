import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import SplashCursor from './components/SplashCursor.jsx';
import SiteBackground from './components/SiteBackground.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import ChatPanel from './components/ChatPanel.jsx';
import { ChatProvider } from './context/ChatContext.jsx';
import Home from './pages/Home.jsx';
import Servicios from './pages/Servicios.jsx';
import Proyectos from './pages/Proyectos.jsx';
import Precios from './pages/Precios.jsx';
import Nosotros from './pages/Nosotros.jsx';

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ChatProvider>
        <SiteBackground />
        {/*
          Ajustes de rendimiento, no de estética: la simulación de fluidos
          advecta la tinta a DYE_RESOLUTION cada frame, y a 1440 eso es ~8 veces
          más píxeles que a 512 para un efecto que de todas formas se ve
          difuminado y a baja opacidad. Las iteraciones de presión corren a
          SIM_RESOLUTION (128), así que ahí el recorte es menor pero gratis.
        */}
        <SplashCursor DYE_RESOLUTION={512} PRESSURE_ITERATIONS={12} />
        <Navbar />
        <ScrollToTop />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/proyectos" element={<Proyectos />} />
            <Route path="/precios" element={<Precios />} />
            <Route path="/nosotros" element={<Nosotros />} />
          </Routes>
        </main>
        <Footer />
        <ChatPanel />
      </ChatProvider>
    </BrowserRouter>
  );
}
