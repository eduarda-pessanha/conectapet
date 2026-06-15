import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { api } from '../api/api';

const INICIAL = {
  nome: '', email: '', cpf: '', telefone: '', endereco: '',
  tipoResidencia: '', temAnimais: '', temCriancas: '', rendaMensal: '',
  animalInteresse: '', petId: '', aceitaTermos: false,
};

function mascararCPF(v) {
  return v.replace(/\D/g, '').slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}
function mascararTel(v) {
  const d = v.replace(/\D/g, '').slice(0, 11);
  if (d.length > 10) return d.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  return d.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
}

export default function Formulario() {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({ ...INICIAL, petId: searchParams.get('pet') || '' });
  const [pets, setPets] = useState([]);
  const [erros, setErros] = useState({});
  const [sucesso, setSucesso] = useState(false);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    api.getPets('?status=Disponível').then(setPets).catch(() => {});
  }, []);

  function set(campo, valor) {
    setForm(f => ({ ...f, [campo]: valor }));
    setErros(e => ({ ...e, [campo]: undefined }));
  }

  function validar() {
    const e = {};
    if (!form.nome.trim())         e.nome         = 'Obrigatório';
    if (!form.email.trim())        e.email        = 'Obrigatório';
    if (!form.cpf.trim())          e.cpf          = 'Obrigatório';
    if (!form.telefone.trim())     e.telefone     = 'Obrigatório';
    if (!form.endereco.trim())     e.endereco     = 'Obrigatório';
    if (!form.tipoResidencia)      e.tipoResidencia = 'Obrigatório';
    if (!form.temAnimais)          e.temAnimais   = 'Obrigatório';
    if (!form.temCriancas)         e.temCriancas  = 'Obrigatório';
    if (!form.rendaMensal)         e.rendaMensal  = 'Obrigatório';
    if (!form.animalInteresse.trim()) e.animalInteresse = 'Obrigatório';
    if (!form.aceitaTermos)        e.aceitaTermos = 'Necessário';
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errosVal = validar();
    if (Object.keys(errosVal).length > 0) { setErros(errosVal); return; }
    setEnviando(true);
    try {
      const { aceitaTermos, ...dados } = form;
      await api.createInteressado({ ...dados, petId: dados.petId || null });
      setSucesso(true);
    } catch (err) {
      alert(err.message);
    } finally {
      setEnviando(false);
    }
  }

  if (sucesso) return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-icon"><i className="fa-solid fa-check-circle" /></div>
        <h2>Formulário enviado!</h2>
        <p>Sua solicitação foi recebida. A ONG responsável irá analisar seu perfil e entrar em contato em breve.</p>
        <Link to="/catalogo" className="btn btn-primary">Ver mais animais</Link>
      </div>
    </div>
  );

  const F = ({ campo, label, children, required }) => (
    <div className="form-group">
      <label>{label}{required && ' *'}</label>
      {children}
      {erros[campo] && <span className="form-error">{erros[campo]}</span>}
    </div>
  );

  return (
    <>
      <Navbar />
      <section className="section formulario-page">
        <div className="container formulario-inner">
          <div className="form-hero">
            <div className="form-hero-text">
              <h1>Pré-Adoção<br /><span>Responsável</span></h1>
              <p>Queremos conhecer você para garantir que você e o animal estejam bem juntos.</p>
              <div className="form-hero-img"><i className="fa-solid fa-paw" /></div>
            </div>
          </div>

          <form className="form-card" onSubmit={handleSubmit} noValidate>
            <h2>Dados Pessoais</h2>
            <div className="form-row">
              <F campo="nome" label="Nome completo" required>
                <input type="text" value={form.nome} onChange={e => set('nome', e.target.value)} className={erros.nome ? 'error' : ''} placeholder="Seu nome completo" />
              </F>
              <F campo="email" label="E-mail" required>
                <input type="email" value={form.email} onChange={e => set('email', e.target.value)} className={erros.email ? 'error' : ''} placeholder="seu@email.com" />
              </F>
            </div>
            <div className="form-row">
              <F campo="cpf" label="CPF" required>
                <input type="text" value={form.cpf} onChange={e => set('cpf', mascararCPF(e.target.value))} className={erros.cpf ? 'error' : ''} placeholder="000.000.000-00" />
              </F>
              <F campo="telefone" label="Telefone" required>
                <input type="tel" value={form.telefone} onChange={e => set('telefone', mascararTel(e.target.value))} className={erros.telefone ? 'error' : ''} placeholder="(00) 00000-0000" />
              </F>
            </div>
            <F campo="endereco" label="Endereço" required>
              <input type="text" value={form.endereco} onChange={e => set('endereco', e.target.value)} className={erros.endereco ? 'error' : ''} placeholder="Rua, número, bairro, cidade" />
            </F>

            <h2>Sobre seu lar</h2>
            <div className="form-row">
              <F campo="tipoResidencia" label="Tipo de residência" required>
                <select value={form.tipoResidencia} onChange={e => set('tipoResidencia', e.target.value)} className={erros.tipoResidencia ? 'error' : ''}>
                  <option value="">Selecione</option>
                  <option>Casa com quintal</option>
                  <option>Casa sem quintal</option>
                  <option>Apartamento</option>
                </select>
              </F>
              <F campo="temAnimais" label="Tem outros animais?" required>
                <select value={form.temAnimais} onChange={e => set('temAnimais', e.target.value)} className={erros.temAnimais ? 'error' : ''}>
                  <option value="">Selecione</option>
                  <option>Não</option>
                  <option>Sim, cachorros</option>
                  <option>Sim, gatos</option>
                  <option>Sim, ambos</option>
                </select>
              </F>
            </div>
            <div className="form-row">
              <F campo="temCriancas" label="Tem crianças em casa?" required>
                <select value={form.temCriancas} onChange={e => set('temCriancas', e.target.value)} className={erros.temCriancas ? 'error' : ''}>
                  <option value="">Selecione</option>
                  <option>Não</option>
                  <option>Sim, bebês</option>
                  <option>Sim, crianças pequenas</option>
                  <option>Sim, adolescentes</option>
                </select>
              </F>
              <F campo="rendaMensal" label="Renda mensal familiar" required>
                <select value={form.rendaMensal} onChange={e => set('rendaMensal', e.target.value)} className={erros.rendaMensal ? 'error' : ''}>
                  <option value="">Selecione</option>
                  <option>Até 1 salário mínimo</option>
                  <option>1 a 3 salários mínimos</option>
                  <option>3 a 5 salários mínimos</option>
                  <option>Acima de 5 salários mínimos</option>
                </select>
              </F>
            </div>

            <h2>Sobre o animal</h2>
            <F campo="animalInteresse" label="Por que deseja adotar um animal?" required>
              <textarea rows={4} value={form.animalInteresse} onChange={e => set('animalInteresse', e.target.value)} className={erros.animalInteresse ? 'error' : ''} placeholder="Conte-nos sua motivação..." />
            </F>
            <F campo="petId" label="Animal de interesse (opcional)">
              <select value={form.petId} onChange={e => set('petId', e.target.value)}>
                <option value="">Selecione um animal (opcional)</option>
                {pets.map(p => <option key={p.id} value={p.id}>{p.emoji} {p.nome} – {p.especie}</option>)}
              </select>
            </F>

            <div className="form-group checkbox-group">
              <input type="checkbox" id="termos" checked={form.aceitaTermos} onChange={e => set('aceitaTermos', e.target.checked)} />
              <label htmlFor="termos" style={erros.aceitaTermos ? { color: 'var(--red)' } : {}}>
                Concordo que as informações fornecidas são verdadeiras e autorizo a ONG a entrar em contato comigo.
              </label>
            </div>

            <button type="submit" className="btn btn-primary btn-lg btn-full" disabled={enviando}>
              {enviando ? 'Enviando...' : 'Enviar formulário'}
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
}
