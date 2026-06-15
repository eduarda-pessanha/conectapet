import { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { api } from '../../api/api';

const FORM_VAZIO = {
  nome: '', especie: '', porte: '', idade: '', idadeCategoria: 'Adulto',
  sexo: '', descricao: '', vacinado: false, castrado: false,
  vermifugado: false, necessidades: false, status: 'Disponível', ong: 'ONG Amor Animal',
};

function calcIdadeCat(idade) {
  if (!idade) return 'Adulto';
  const l = idade.toLowerCase();
  if (l.includes('filhote') || l.includes('mês') || l.includes('meses')) return 'Filhote';
  const anos = parseInt(l);
  if (!isNaN(anos) && anos >= 7) return 'Idoso';
  return 'Adulto';
}

export default function Animais() {
  const [pets, setPets] = useState([]);
  const [filtros, setFiltros] = useState({ search: '', especie: '', porte: '', status: '' });
  const [modal, setModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(FORM_VAZIO);
  const [pagina, setPagina] = useState(1);
  const PER_PAGE = 8;

  async function carregar() {
    try {
      const data = await api.getPets();
      setPets(data);
    } catch (e) { console.error(e); }
  }

  useEffect(() => { carregar(); }, []);

  const filtrados = pets.filter(p => {
    if (filtros.search  && !p.nome.toLowerCase().includes(filtros.search.toLowerCase())) return false;
    if (filtros.especie && p.especie !== filtros.especie) return false;
    if (filtros.porte   && p.porte   !== filtros.porte)   return false;
    if (filtros.status  && p.status  !== filtros.status)  return false;
    return true;
  });

  const totalPaginas = Math.ceil(filtrados.length / PER_PAGE);
  const paginados = filtrados.slice((pagina - 1) * PER_PAGE, pagina * PER_PAGE);

  function abrirNovo() {
    setEditId(null);
    setForm(FORM_VAZIO);
    setModal(true);
  }

  function abrirEditar(pet) {
    setEditId(pet.id);
    setForm({ ...pet });
    setModal(true);
  }

  async function deletar(id) {
    if (!confirm('Remover este animal?')) return;
    try {
      await api.deletePet(id);
      carregar();
    } catch (e) { alert(e.message); }
  }

  async function salvar(e) {
    e.preventDefault();
    try {
      const dados = { ...form, idadeCategoria: calcIdadeCat(form.idade) };
      if (editId) {
        await api.updatePet(editId, dados);
      } else {
        await api.createPet(dados);
      }
      setModal(false);
      carregar();
    } catch (err) { alert(err.message); }
  }

  function setF(campo, valor) {
    setForm(f => ({ ...f, [campo]: valor }));
  }

  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="admin-main">
        <header className="admin-topbar">
          <h1>Animais</h1>
          <button className="btn btn-primary" onClick={abrirNovo}>
            <i className="fa-solid fa-plus" /> Novo animal
          </button>
        </header>

        <div className="admin-filters">
          <input
            type="text"
            className="search-input"
            placeholder="Buscar por nome..."
            value={filtros.search}
            onChange={e => setFiltros(f => ({ ...f, search: e.target.value }))}
          />
          {[
            { campo: 'especie', opts: ['Cachorro','Gato'], placeholder: 'Espécie' },
            { campo: 'porte',   opts: ['Pequeno','Médio','Grande'], placeholder: 'Porte' },
            { campo: 'status',  opts: ['Disponível','Adotado'], placeholder: 'Status' },
          ].map(f => (
            <select key={f.campo} value={filtros[f.campo]} onChange={e => setFiltros(ff => ({ ...ff, [f.campo]: e.target.value }))}>
              <option value="">{f.placeholder}</option>
              {f.opts.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          ))}
        </div>

        <div className="dash-table-card">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Animal</th><th>Espécie</th><th>Porte</th><th>Idade</th><th>Status</th><th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {paginados.map(p => (
                <tr key={p.id}>
                  <td style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: '1.5rem' }}>{p.emoji}</span>
                    <strong>{p.nome}</strong>
                  </td>
                  <td>{p.especie}</td>
                  <td>{p.porte}</td>
                  <td>{p.idade}</td>
                  <td>
                    <span className={`status-badge ${p.status === 'Disponível' ? 'disponivel' : 'adotado'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-btns">
                      <button className="action-btn edit" onClick={() => abrirEditar(p)} title="Editar">
                        <i className="fa-solid fa-pen" />
                      </button>
                      <button className="action-btn delete" onClick={() => deletar(p.id)} title="Remover">
                        <i className="fa-solid fa-trash" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {paginados.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', color: 'var(--gray-400)', padding: 32 }}>
                    Nenhum animal encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {totalPaginas > 1 && (
            <div className="pagination">
              {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(n => (
                <button
                  key={n}
                  className={`page-btn${n === pagina ? ' active' : ''}`}
                  onClick={() => setPagina(n)}
                >
                  {n}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* MODAL */}
        {modal && (
          <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setModal(false)}>
            <div className="modal modal-lg">
              <div className="modal-header">
                <h2>{editId ? 'Editar Animal' : 'Novo Animal'}</h2>
                <button className="modal-close" onClick={() => setModal(false)}>
                  <i className="fa-solid fa-xmark" />
                </button>
              </div>
              <form onSubmit={salvar} style={{ textAlign: 'left' }}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Nome *</label>
                    <input type="text" value={form.nome} onChange={e => setF('nome', e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label>Espécie *</label>
                    <select value={form.especie} onChange={e => setF('especie', e.target.value)} required>
                      <option value="">Selecione</option>
                      <option>Cachorro</option>
                      <option>Gato</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Porte *</label>
                    <select value={form.porte} onChange={e => setF('porte', e.target.value)} required>
                      <option value="">Selecione</option>
                      <option>Pequeno</option>
                      <option>Médio</option>
                      <option>Grande</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Idade *</label>
                    <input type="text" value={form.idade} onChange={e => setF('idade', e.target.value)} placeholder="Ex: 2 anos" required />
                  </div>
                  <div className="form-group">
                    <label>Sexo *</label>
                    <select value={form.sexo} onChange={e => setF('sexo', e.target.value)} required>
                      <option value="">Selecione</option>
                      <option>Macho</option>
                      <option>Fêmea</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Descrição</label>
                  <textarea rows={3} value={form.descricao} onChange={e => setF('descricao', e.target.value)} placeholder="Personalidade e histórico do animal..." />
                </div>
                <div className="form-row" style={{ flexWrap: 'wrap' }}>
                  {[
                    { campo: 'vacinado',    label: 'Vacinado' },
                    { campo: 'castrado',    label: 'Castrado' },
                    { campo: 'vermifugado', label: 'Vermifugado' },
                    { campo: 'necessidades', label: 'Necessidades especiais' },
                  ].map(c => (
                    <div key={c.campo} className="form-group checkbox-group">
                      <input type="checkbox" id={c.campo} checked={!!form[c.campo]} onChange={e => setF(c.campo, e.target.checked)} />
                      <label htmlFor={c.campo}>{c.label}</label>
                    </div>
                  ))}
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select value={form.status} onChange={e => setF('status', e.target.value)}>
                    <option>Disponível</option>
                    <option>Adotado</option>
                  </select>
                </div>
                <div className="form-actions">
                  <button type="button" className="btn btn-outline" onClick={() => setModal(false)}>Cancelar</button>
                  <button type="submit" className="btn btn-primary">Salvar animal</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
