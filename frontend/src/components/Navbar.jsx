import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/',         label: 'Início' },
  { to: '/catalogo', label: 'Saiba mais' },
  { to: '/adotar',   label: 'Entre em contato' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <nav className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="logo" onClick={() => setOpen(false)}>
          <i className="fa-solid fa-paw" /> ConectaPet
        </Link>

        <ul className={`nav-links${open ? ' open' : ''}`}>
          {NAV_LINKS.map(l => (
            <li key={l.to}>
              <Link
                to={l.to}
                className={pathname === l.to ? 'active' : ''}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <Link to="/admin/login" className="btn btn-outline">Sign in</Link>
          <Link to="/adotar"      className="btn btn-primary">Quero adotar</Link>
        </div>

        <button
          className="hamburger"
          onClick={() => setOpen(o => !o)}
          aria-label="Menu"
        >
          <i className={`fa-solid ${open ? 'fa-xmark' : 'fa-bars'}`} />
        </button>
      </div>
    </nav>
  );
}
