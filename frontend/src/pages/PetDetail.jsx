import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { api } from '../api/api';

export default function PetDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    api.getPet(id)
      .then(setPet)
      .catch(() => setErro(true));
  }, [id]);

  if (erro) return (
    <>
      <Navbar />
      <div className="container section">
        <p>Animal não encontrado. <Link to="/catalogo">Voltar ao catálogo</Link></p>
      </div>
      <Footer />
    </>
  );

  if (!pet) return (
    <>
      <Navbar />
      <div className="container section">
        <p style={{ color: 'var(--gray-500)' }}>Carregando...</p>
      </div>
    </>
  );

  return (
    <>
      <Navbar />
      <section className="section pet-detail">
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/catalogo">Catálogo</Link> &rsaquo; <span>{pet.nome}</span>
          </nav>

          <div className="pet-detail-inner">
            {/* Galeria */}
            <div className="pet-gallery">
              <div className="pet-main-img">
                {pet.imagem ? (
                  <img src={pet.imagem} alt={pet.nome} />
                ) : (
                  <span style={{ fontSize: '8rem' }}>{pet.emoji}</span>
                )}
              </div>
              <div className="pet-thumbs">
                {[0, 1, 2].map(i => (
                  <div key={i} className={`pet-thumb${i === 0 ? ' active' : ''}`}>
                    {pet.imagem ? (
                      <img src={pet.imagem} alt={`${pet.nome} ${i + 1}`} />
                    ) : (
                      pet.emoji
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="pet-info">
              <h2>{pet.nome}</h2>
              <div className="pet-status-row">
                <span className="badge badge-green">{pet.status}</span>
                <span className="badge badge-blue">{pet.especie}</span>
                <span className="badge badge-orange">{pet.porte}</span>
                {pet.necessidades && <span className="badge badge-purple">Necessidades especiais</span>}
              </div>

              <div className="pet-about">
                <h3>Sobre {pet.nome}</h3>
                <p>{pet.descricao}</p>
              </div>

              <div className="pet-checklist">
                <div className="pet-check">
                  <i className={`fa-solid ${pet.sexo === 'Macho' ? 'fa-mars' : 'fa-venus'}`} />
                  <span>{pet.sexo}</span>
                </div>
                <div className="pet-check">
                  <i className="fa-solid fa-cake-candles" />
                  <span>{pet.idade}</span>
                </div>
                {pet.vacinado    && <div className="pet-check"><i className="fa-solid fa-syringe" /><span>Vacinado</span></div>}
                {pet.castrado    && <div className="pet-check"><i className="fa-solid fa-scissors" /><span>Castrado</span></div>}
                {pet.vermifugado && <div className="pet-check"><i className="fa-solid fa-pills" /><span>Vermifugado</span></div>}
                <div className="pet-check">
                  <i className="fa-solid fa-building-ngo" />
                  <span>{pet.ong}</span>
                </div>
              </div>

              <div className="pet-actions">
                <Link to={`/adotar?pet=${pet.id}`} className="btn btn-primary btn-lg">
                  <i className="fa-solid fa-heart" /> Tenho interesse em adotar
                </Link>
                <button
                  className="btn btn-outline"
                  onClick={() => navigator.share
                    ? navigator.share({ title: pet.nome, url: location.href })
                    : navigator.clipboard.writeText(location.href).then(() => alert('Link copiado!'))
                  }
                >
                  <i className="fa-solid fa-share-nodes" /> Compartilhar
                </button>
              </div>
            </div>
          </div>

          <div className="antes-de-adotar">
            <div className="antes-icon"><i className="fa-solid fa-heart" /></div>
            <div>
              <h3>Antes de adotar</h3>
              <p>Preencha nosso formulário de pré-adoção para que possamos conhecer você e sua casa. Garantimos o melhor match entre o adotante e o animal.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
