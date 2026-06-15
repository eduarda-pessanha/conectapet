import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { api } from '../../api/api';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  if (localStorage.getItem('token')) return <Navigate to="/admin/dashboard" replace />;

  async function handleSubmit(e) {
    e.preventDefault();
    setErro('');
    setCarregando(true);
    try {
      const data = await api.login(email, senha);
      localStorage.setItem('token', data.token);
      localStorage.setItem('adminNome', data.nome);
      navigate('/admin/dashboard');
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <a href="/" className="logo login-logo"><i className="fa-solid fa-paw" /> ConectaPet</a>
        <h2>Acesso ONG</h2>
        <p>Entre com suas credenciais para acessar o painel administrativo.</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label>E-mail</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="ong@exemplo.com" required autoComplete="email" />
          </div>
          <div className="form-group">
            <label>Senha</label>
            <div className="input-icon">
              <input
                type={mostrarSenha ? 'text' : 'password'}
                value={senha}
                onChange={e => setSenha(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
              <button type="button" onClick={() => setMostrarSenha(v => !v)}>
                <i className={`fa-solid ${mostrarSenha ? 'fa-eye-slash' : 'fa-eye'}`} />
              </button>
            </div>
          </div>

          {erro && <div className="form-error" style={{ marginBottom: 12 }}>{erro}</div>}

          <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={carregando}>
            {carregando ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="login-hint">
          Credenciais de demonstração:<br />
          <code>admin@conectapet.com</code> / <code>123456</code>
        </p>
      </div>
    </div>
  );
}
