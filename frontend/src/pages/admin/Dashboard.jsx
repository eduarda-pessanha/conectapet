import { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { api } from '../../api/api';

const MESES = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
const BAR_DATA = [4, 7, 5, 9, 6, 3, 8, 10, 7, 5, 4, 6];

export default function Dashboard() {
  const [pets, setPets] = useState([]);
  const [interessados, setInteressados] = useState([]);
  const nome = localStorage.getItem('adminNome') || 'Admin';

  useEffect(() => {
    api.getPets().then(setPets).catch(() => {});
    api.getInteressados().then(setInteressados).catch(() => {});
  }, []);

  const disponíveis = pets.filter(p => p.status === 'Disponível').length;
  const adotados    = pets.filter(p => p.status === 'Adotado').length;
  const maxBar = Math.max(...BAR_DATA);

  function statusClass(s) {
    if (s === 'Novo') return 'novo';
    if (s === 'Em análise') return 'em-analise';
    if (s === 'Aprovado') return 'aprovado';
    return 'novo';
  }

  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="admin-main">
        <header className="admin-topbar">
          <h1>Dashboard</h1>
          <div className="topbar-right">
            <span>Bem-vindo, <strong>{nome}</strong></span>
            <div className="topbar-badge">ONG Ativa <i className="fa-solid fa-circle-check" /></div>
          </div>
        </header>

        <div className="dash-cards">
          {[
            { icon: 'fa-dog',          color: 'purple', label: 'Animais cadastrados',  val: pets.length },
            { icon: 'fa-heart',        color: 'green',  label: 'Em adoção',             val: disponíveis },
            { icon: 'fa-check-circle', color: 'blue',   label: 'Adoções finalizadas',   val: adotados },
            { icon: 'fa-clock',        color: 'orange', label: 'Interessados',          val: interessados.length },
          ].map(c => (
            <div key={c.label} className="dash-card">
              <div className={`dash-card-icon ${c.color}`}><i className={`fa-solid ${c.icon}`} /></div>
              <div>
                <span className="dash-label">{c.label}</span>
                <span className="dash-value">{c.val}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="dash-charts">
          <div className="dash-chart-card">
            <h3>Adoções por mês</h3>
            <div className="bar-chart">
              {BAR_DATA.map((v, i) => (
                <div
                  key={i}
                  className="bar"
                  style={{ height: `${(v / maxBar) * 100}%` }}
                  title={`${MESES[i]}: ${v} adoções`}
                >
                  <span className="bar-label">{MESES[i]}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="dash-chart-card">
            <h3>Animais por espécie</h3>
            <div className="pie-chart-wrap">
              <div className="pie-chart" />
              <div className="pie-legend">
                <div><span className="legend-dot dog" /> Cães: 65%</div>
                <div><span className="legend-dot cat" /> Gatos: 35%</div>
              </div>
            </div>
          </div>
        </div>

        <div className="dash-table-card">
          <div className="table-header">
            <h3>Últimos interessados</h3>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nome</th><th>E-mail</th><th>Pet</th><th>Data</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {interessados.slice(0, 5).map(i => (
                <tr key={i.id}>
                  <td>{i.nome}</td>
                  <td>{i.email}</td>
                  <td>{i.petNome || '—'}</td>
                  <td>{i.data}</td>
                  <td><span className={`status-badge ${statusClass(i.status)}`}>{i.status}</span></td>
                </tr>
              ))}
              {interessados.length === 0 && (
                <tr><td colSpan={5} style={{ color: 'var(--gray-400)', textAlign: 'center', padding: 24 }}>Nenhum interessado ainda</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
