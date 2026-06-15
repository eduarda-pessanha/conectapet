import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PetCard from '../components/PetCard';
import { api } from '../api/api';

export default function Home() {
  const [destaques, setDestaques] = useState([]);

  useEffect(() => {
    api.getPets('?status=Disponível').then(pets => setDestaques(pets.slice(0, 4))).catch(() => {});
  }, []);

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-text">
            <h1>Conectando corações,<br /><span>mudando vidas.</span></h1>
            <p>Encontre seu novo melhor amigo e ajude uma ONG a transformar mais histórias. Adote com responsabilidade.</p>
            <div className="hero-btns">
              <Link to="/catalogo" className="btn btn-primary btn-lg">Ver animais para adoção</Link>
              <Link to="/adotar"   className="btn btn-outline btn-lg">Enviar feedback</Link>
            </div>
            <div className="hero-stats">
              <div className="stat"><i className="fa-solid fa-dog" /><span>Animais resgatados e abrigados</span></div>
              <div className="stat"><i className="fa-solid fa-heart" /><span>Triagem responsável e segura</span></div>
              <div className="stat"><i className="fa-solid fa-house-chimney-heart" /><span>Adoções que fazem a diferença</span></div>
              <div className="stat"><i className="fa-solid fa-hands-holding-heart" /><span>Apoie quem leva a vida</span></div>
            </div>
          </div>
          <div className="hero-img-placeholder hero-photo">
            <img src="/assets/pets/thor.png" alt="Cachorro disponível para adoção" />
          </div>
        </div>
      </section>

      {/* DESTAQUES */}
      <section className="section destaque">
        <div className="container">
          <div className="section-header">
            <h2>Animais em destaque</h2>
            <Link to="/catalogo" className="ver-todos">
              Ver todos <i className="fa-solid fa-arrow-right" />
            </Link>
          </div>
          <div className="pets-grid">
            {destaques.map(p => <PetCard key={p.id} pet={p} />)}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="section como-funciona">
        <div className="container">
          <h2 className="text-center">Como funciona?</h2>
          <p className="subtitle text-center">Adotar nunca foi tão fácil. Siga os passos abaixo.</p>
          <div className="steps">
            {[
              { icon: 'fa-magnifying-glass', n: 1, title: 'Busque',       desc: 'Explore o catálogo e use filtros por espécie, porte, idade e necessidades especiais.' },
              { icon: 'fa-heart',            n: 2, title: 'Escolha',      desc: 'Veja os detalhes completos do animal: fotos, personalidade e histórico.' },
              { icon: 'fa-file-pen',         n: 3, title: 'Candidate-se', desc: 'Preencha o formulário de pré-adoção para que a ONG conheça seu perfil.' },
              { icon: 'fa-check-circle',     n: 4, title: 'Adote',        desc: 'A ONG analisa seu perfil e entra em contato para concluir a adoção.' },
            ].map(s => (
              <div key={s.n} className="step">
                <div className="step-icon"><i className={`fa-solid ${s.icon}`} /></div>
                <h3>{s.n}. {s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSÃO */}
      <section className="section missao" id="missao">
        <div className="container missao-inner">
          <div className="missao-img">
            <div className="missao-placeholder missao-photo">
              <img src="/assets/pets/bolinha.png" alt="Gatinho resgatado aguardando adoção" />
            </div>
          </div>
          <div className="missao-text">
            <h2>Nossa missão</h2>
            <p>O ConectaPet nasce da necessidade de combater o abandono animal em Belo Horizonte. Segundo a OMS, existem cerca de <strong>30 milhões de animais abandonados no Brasil</strong>.</p>
            <p>Nossa plataforma centraliza as informações dos animais resgatados, oferece filtros inteligentes e um sistema de triagem que garante adoções mais responsáveis e duradouras.</p>
            <Link to="/catalogo" className="btn btn-primary">Saiba mais</Link>
          </div>
        </div>
      </section>

      {/* ODS */}
      <section className="section ods">
        <div className="container">
          <h2 className="text-center">Alinhado aos ODS da ONU</h2>
          <div className="ods-cards">
            <div className="ods-card ods3">
              <span className="ods-num">ODS 3</span>
              <h3>Saúde e Bem-Estar</h3>
              <p>Contribuímos para a redução de zoonoses e promoção do bem-estar animal.</p>
            </div>
            <div className="ods-card ods11">
              <span className="ods-num">ODS 11</span>
              <h3>Cidades Sustentáveis</h3>
              <p>Promovemos a gestão humanitária da fauna urbana em Belo Horizonte.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
