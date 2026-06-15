import { useEffect, useState, useCallback } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PetCard from '../components/PetCard';
import { api } from '../api/api';

const PER_PAGE = 8;

const FILTROS_INICIAL = { especie: '', porte: '', idadeCategoria: '', sexo: '', necessidades: '', search: '' };

export default function Catalogo() {
  const [pets, setPets] = useState([]);
  const [filtros, setFiltros] = useState(FILTROS_INICIAL);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [pagina, setPagina] = useState(1);
  const [carregando, setCarregando] = useState(true);

  const buscar = useCallback(async () => {
    setCarregando(true);
    try {
      const params = new URLSearchParams({ status: 'Disponível' });
      Object.entries(filtros).forEach(([k, v]) => { if (v) params.set(k, v); });
      const data = await api.getPets('?' + params.toString());
      setPets(data);
      setPagina(1);
    } catch (e) {
      console.error(e);
    } finally {
      setCarregando(false);
    }
  }, [filtros]);

  useEffect(() => {
    const timer = setTimeout(buscar, 300);
    return () => clearTimeout(timer);
  }, [buscar]);

  function setFiltro(campo, valor) {
    setFiltros(f => ({ ...f, [campo]: valor }));
  }

  function limpar() {
    setFiltros(FILTROS_INICIAL);
  }

  const totalPaginas = Math.ceil(pets.length / PER_PAGE);
  const paginados = pets.slice((pagina - 1) * PER_PAGE, pagina * PER_PAGE);

  return (
    <>
      <Navbar />
      <section className="section catalogo-page">
        <div className="container">
          <h1>Todos os animais</h1>
          <p className="subtitle">Encontre seu novo companheiro</p>

          <div className="filtros-bar">
            <input
              type="text"
              className="search-input"
              placeholder="Buscar por nome..."
              value={filtros.search}
              onChange={e => setFiltro('search', e.target.value)}
            />
            <button className="btn btn-outline" onClick={() => setMostrarFiltros(f => !f)}>
              <i className="fa-solid fa-sliders" /> Filtros
            </button>
          </div>

          {mostrarFiltros && (
            <div className="filtros-avancados open">
              <div className="filtros-row">
                {[
                  { id: 'especie',        label: 'Espécie',    opts: ['Cachorro','Gato'] },
                  { id: 'porte',          label: 'Porte',      opts: ['Pequeno','Médio','Grande'] },
                  { id: 'idadeCategoria', label: 'Idade',      opts: ['Filhote','Adulto','Idoso'] },
                  { id: 'sexo',           label: 'Sexo',       opts: ['Macho','Fêmea'] },
                ].map(f => (
                  <div key={f.id} className="filtro-group">
                    <label>{f.label}</label>
                    <select value={filtros[f.id]} onChange={e => setFiltro(f.id, e.target.value)}>
                      <option value="">Todos</option>
                      {f.opts.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                ))}
                <div className="filtro-group">
                  <label>Necessidades especiais</label>
                  <select value={filtros.necessidades} onChange={e => setFiltro('necessidades', e.target.value)}>
                    <option value="">Todas</option>
                    <option value="sim">Com necessidades</option>
                    <option value="nao">Sem necessidades</option>
                  </select>
                </div>
                <button className="btn btn-outline" onClick={limpar}>Limpar filtros</button>
              </div>
            </div>
          )}

          {carregando ? (
            <p style={{ marginTop: 40, color: 'var(--gray-500)' }}>Carregando...</p>
          ) : paginados.length === 0 ? (
            <p style={{ marginTop: 40, color: 'var(--gray-500)' }}>Nenhum animal encontrado.</p>
          ) : (
            <div className="pets-grid">
              {paginados.map(p => <PetCard key={p.id} pet={p} />)}
            </div>
          )}

          {totalPaginas > 1 && (
            <div className="pagination">
              {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(n => (
                <button
                  key={n}
                  className={`page-btn${n === pagina ? ' active' : ''}`}
                  onClick={() => { setPagina(n); window.scrollTo(0, 0); }}
                >
                  {n}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
