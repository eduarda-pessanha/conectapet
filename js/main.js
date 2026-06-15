// main.js – Página inicial

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger) {
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
}

// Renderizar animais em destaque
function renderDestaque() {
  const grid = document.getElementById('destaqueGrid');
  if (!grid) return;
  const pets = getPets().filter(p => p.status === 'Disponível').slice(0, 4);
  grid.innerHTML = pets.map(petCard).join('');
}

function petCard(pet) {
  const media = pet.imagem
    ? `<img src="${pet.imagem}" alt="${pet.nome}" loading="lazy">`
    : `<span>${pet.emoji}</span>`;
  return `
    <div class="pet-card" onclick="location.href='pet-detail.html?id=${pet.id}'">
      <div class="pet-card-img">
        ${media}
      </div>
      <div class="pet-card-body">
        <div class="pet-card-header">
          <span class="pet-card-name">${pet.nome}</span>
          <button class="pet-card-fav" onclick="event.stopPropagation(); this.classList.toggle('active')" title="Favoritar">
            <i class="fa-solid fa-heart"></i>
          </button>
        </div>
        <p class="pet-card-info">${pet.especie} • ${pet.porte} • ${pet.idade}</p>
        <div class="pet-tags">
          ${pet.vacinado ? '<span class="tag purple">Vacinado</span>' : ''}
          ${pet.castrado ? '<span class="tag purple">Castrado</span>' : ''}
          ${pet.necessidades ? '<span class="tag">Necessidades especiais</span>' : ''}
        </div>
      </div>
    </div>
  `;
}

renderDestaque();
