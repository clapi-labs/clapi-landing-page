import { Link } from 'react-router-dom';
import Container from './Container.jsx';
import logoLight from '../assets/logotipo-light.png';

const NAV_LINKS = [
  { to: '/servicios', label: 'Servicios' },
  { to: '/proyectos', label: 'Proyectos' },
  { to: '/precios', label: 'Precios' },
  { to: '/nosotros', label: 'Nosotros' },
];

const CONTACT_LINKS = [
  { href: 'mailto:hola@clapi.tech', label: 'hola@clapi.tech' },
  { href: 'https://instagram.com', label: 'Instagram' },
  { href: 'https://linkedin.com', label: 'LinkedIn' },
  { href: 'https://wa.me/', label: 'WhatsApp' },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-white/70">
      <Container className="grid gap-12 py-16 sm:grid-cols-3 md:py-20">
        <div>
          <Link to="/" aria-label="Clapi — inicio">
            <img src={logoLight} alt="Clapi" className="h-6 w-auto" />
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed">
            Automatizamos lo repetitivo para que te enfoques en lo que importa.
          </p>
        </div>

        <nav aria-label="Navegación del pie de página">
          <p className="text-sm font-semibold text-white">Navegación</p>
          <ul className="mt-5 flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="text-sm transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-sm font-semibold text-white">Contacto</p>
          <ul className="mt-5 flex flex-col gap-3">
            {CONTACT_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm transition-colors hover:text-white"
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10 py-6">
        <p className="text-center text-sm text-white/50">
          © 2026 Clapi. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
