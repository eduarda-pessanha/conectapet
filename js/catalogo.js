// catalogo.js

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger) hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));

const btnFiltros = document.getElementById('btnFiltros');
const filtrosAvancados = document.getElementById('filtrosAvancados');
if (btnFiltros) {
  btnFiltros.addEventListener('click', () => filtrosAvancados.classList.toggle('open'));
}

document.getElementById('btnLimpar')?.addEventListener('click', () => {
  document.getElementById('searchInput').value = '';
  document.getElementById('filtroEspecie').value = '';
  document.getElementById('filtroPorte').value = '';
  document.getElementById('filtroIdade').value = '';
  document.getElementById('filtroSexo').value = '';
  document.getElementById('filtroNecessidades').value = '';
  currentPage = 1;
  render();
});

let currentPage = 1;
const PER_PAGE = 8;

function getFiltered() {
  const search = (document.getElementById('searchInput')?.value || '').toLowerCase();
  const especie = document.getElementById('filtroEspecie')?.value || '';
  const porte = document.getElementById('filtroPorte')?.value || '';
  const idadeCat = document.getElementById('filtroIdade')?.value || '';
  const sexo = document.getElementById('filtroSexo')?.value || '';
  const nec = document.getElementById('filtroNecessidades')?.value || '';

  return getPets().filter(p => {
    if (p.status !== 'Disponível') return false;
    if (search && !p.nome.toLowerCase().includes(search)) return false;
    if (especie && p.especie !== especie) return false;
    if (porte && p.porte !== porte) return false;
    if (idadeCat && p.idadeCategoria !== idadeCat) return false;
    if (sexo && p.sexo !== sexo) return false;
    if (nec === 'sim' && !p.necessidades) return false;
    if (nec === 'nao' && p.necessidades) return false;
    return true;
  });
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
          <button class="pet-card-fav" onclick="event.stopPropagation(); this.classList.toggle('active')">
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

function render() {
  const filtered = getFiltered();
  const grid = document.getElementById('catalogoGrid');
  const pagination = document.getElementById('pagination');

  const start = (currentPage - 1) * PER_PAGE;
  const page = filtered.slice(start, start + PER_PAGE);

  if (page.length === 0) {
    grid.innerHTML = '<p style="color:var(--gray-500); margin-top:32px;">Nenhum animal encontrado com os filtros selecionados.</p>';
  } else {
    grid.innerHTML = page.map(petCard).join('');
  }

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  pagination.innerHTML = '';
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.className = 'page-btn' + (i === currentPage ? ' active' : '');
    btn.textContent = i;
    btn.addEventListener('click', () => { currentPage = i; render(); window.scrollTo(0, 0); });
    pagination.appendChild(btn);
  }
}

// Debounce search
let searchTimeout;
document.getElementById('searchInput')?.addEventListener('input', () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => { currentPage = 1; render(); }, 300);
});

['filtroEspecie','filtroPorte','filtroIdade','filtroSexo','filtroNecessidades'].forEach(id => {
  document.getElementById(id)?.addEventListener('change', () => { currentPage = 1; render(); });
});

render();
