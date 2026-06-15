import { Link, useLocation, useNavigate } from 'react-router-dom';

const LINKS = [
  { to: '/admin/dashboard', icon: 'fa-gauge',               label: 'Dashboard' },
  { to: '/admin/animais',   icon: 'fa-dog',                 label: 'Animais' },
];

export default function Sidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem('token');
    navigate('/admin/login');
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <i className="fa-solid fa-paw" /> ConectaPet
      </div>

      <nav className="sidebar-nav">
        {LINKS.map(l => (
          <Link
            key={l.to}
            to={l.to}
            className={pathname.startsWith(l.to) ? 'active' : ''}
          >
            <i className={`fa-solid ${l.icon}`} /> {l.label}
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <a href="/" target="_blank" rel="noreferrer">
          <i className="fa-solid fa-arrow-up-right-from-square" /> Ver site
        </a>
        <button onClick={logout} className="sidebar-logout-btn">
          <i className="fa-solid fa-right-from-bracket" /> Sair
        </button>
      </div>
    </aside>
  );
}
