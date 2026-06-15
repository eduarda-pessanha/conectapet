// pet-detail.js

const params = new URLSearchParams(location.search);
const id = parseInt(params.get('id'));
const pet = getPets().find(p => p.id === id);

if (!pet) {
  document.getElementById('petDetailInner').innerHTML = '<p>Animal não encontrado. <a href="catalogo.html">Voltar ao catálogo</a></p>';
} else {
  document.title = `${pet.nome} – ConectaPet`;
  document.getElementById('breadcrumbNome').textContent = pet.nome;

  const mainMedia = pet.imagem
    ? `<img src="${pet.imagem}" alt="${pet.nome}">`
    : `<span style="font-size:8rem">${pet.emoji}</span>`;
  const thumbMedia = pet.imagem
    ? `<img src="${pet.imagem}" alt="${pet.nome}">`
    : pet.emoji;

  const detail = document.getElementById('petDetailInner');
  detail.innerHTML = `
    <div class="pet-gallery">
      <div class="pet-main-img">${mainMedia}</div>
      <div class="pet-thumbs">
        <div class="pet-thumb active">${thumbMedia}</div>
        <div class="pet-thumb">${thumbMedia}</div>
        <div class="pet-thumb">${thumbMedia}</div>
      </div>
    </div>

    <div class="pet-info">
      <nav style="font-size:.8rem;color:var(--gray-500);margin-bottom:8px;">
        Catálogo &rsaquo; ${pet.especie} &rsaquo; ${pet.porte}
      </nav>
      <h2>${pet.nome}</h2>
      <div class="pet-status-row">
        <span class="badge badge-green">${pet.status}</span>
        <span class="badge badge-blue">${pet.especie}</span>
        <span class="badge badge-orange">${pet.porte}</span>
        ${pet.necessidades ? '<span class="badge badge-purple">Necessidades especiais</span>' : ''}
      </div>

      <div class="pet-about">
        <h3>Sobre ${pet.nome}</h3>
        <p>${pet.descricao}</p>
      </div>

      <div class="pet-checklist">
        <div class="pet-check">
          <i class="fa-solid ${pet.sexo === 'Macho' ? 'fa-mars' : 'fa-venus'}"></i>
          <span>${pet.sexo}</span>
        </div>
        <div class="pet-check">
          <i class="fa-solid fa-cake-candles"></i>
          <span>${pet.idade}</span>
        </div>
        ${pet.vacinado ? `<div class="pet-check"><i class="fa-solid fa-syringe"></i><span>Vacinado</span></div>` : ''}
        ${pet.castrado ? `<div class="pet-check"><i class="fa-solid fa-scissors"></i><span>Castrado</span></div>` : ''}
        ${pet.vermifugado ? `<div class="pet-check"><i class="fa-solid fa-pills"></i><span>Vermifugado</span></div>` : ''}
        <div class="pet-check">
          <i class="fa-solid fa-building-ngo"></i>
          <span>${pet.ong}</span>
        </div>
      </div>

      <div class="pet-actions">
        <a href="formulario.html?pet=${pet.id}" class="btn btn-primary btn-lg">
          <i class="fa-solid fa-heart"></i> Tenho interesse em adotar
        </a>
        <button class="btn btn-outline" onclick="navigator.share ? navigator.share({title:'${pet.nome}', url: location.href}) : alert('Copie o link da barra de endereços!')">
          <i class="fa-solid fa-share-nodes"></i> Compartilhar
        </button>
      </div>
    </div>
  `;
}
