import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="logo"><i className="fa-solid fa-paw" /> ConectaPet</span>
          <p>Conectando corações, mudando vidas.</p>
        </div>
        <div className="footer-links">
          <h4>Links</h4>
          <ul>
            <li><Link to="/">Início</Link></li>
            <li><Link to="/catalogo">Catálogo</Link></li>
            <li><Link to="/adotar">Adotar</Link></li>
            <li><Link to="/admin/login">ONGs</Link></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h4>Contato</h4>
          <p><i className="fa-solid fa-envelope" /> contato@conectapet.com.br</p>
          <p><i className="fa-solid fa-map-marker-alt" /> Belo Horizonte, MG</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 ConectaPet – Projeto UPX-4 | Newton Paiva</p>
      </div>
    </footer>
  );
}
