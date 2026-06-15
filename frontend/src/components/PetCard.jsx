import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PetCard({ pet }) {
  const navigate = useNavigate();
  const [fav, setFav] = useState(false);

  return (
    <div className="pet-card" onClick={() => navigate(`/pet/${pet.id}`)}>
      <div className="pet-card-img">
        {pet.imagem ? (
          <img src={pet.imagem} alt={pet.nome} loading="lazy" />
        ) : (
          <span>{pet.emoji}</span>
        )}
      </div>
      <div className="pet-card-body">
        <div className="pet-card-header">
          <span className="pet-card-name">{pet.nome}</span>
          <button
            className={`pet-card-fav${fav ? ' active' : ''}`}
            onClick={e => { e.stopPropagation(); setFav(f => !f); }}
            title="Favoritar"
          >
            <i className="fa-solid fa-heart" />
          </button>
        </div>
        <p className="pet-card-info">{pet.especie} • {pet.porte} • {pet.idade}</p>
        <div className="pet-tags">
          {pet.vacinado    && <span className="tag purple">Vacinado</span>}
          {pet.castrado    && <span className="tag purple">Castrado</span>}
          {pet.necessidades && <span className="tag">Necessidades especiais</span>}
        </div>
      </div>
    </div>
  );
}
