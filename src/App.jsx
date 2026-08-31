import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import SplashCursor from './components/SplashCursor.jsx';
import SiteBackground from './components/SiteBackground.jsx';
import Hero from './sections/Hero.jsx';
import LogoBar from './sections/LogoBar.jsx';
import Problem from './sections/Problem.jsx';
import Services from './sections/Services.jsx';
import Process from './sections/Process.jsx';
import WhyClapi from './sections/WhyClapi.jsx';
import Narrative from './sections/Narrative.jsx';
import Testimonials from './sections/Testimonials.jsx';
import FinalCTA from './sections/FinalCTA.jsx';

export default function App() {
  return (
    <>
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
      <main>
        <Hero />
        <LogoBar />
        <Problem />
        <Services />
        <Process />
        <WhyClapi />
        <Narrative />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
