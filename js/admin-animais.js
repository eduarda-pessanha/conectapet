// admin-animais.js

if (!localStorage.getItem('adminLogado')) location.href = 'login.html';

document.getElementById('logoutBtn')?.addEventListener('click', (e) => {
  e.preventDefault();
  localStorage.removeItem('adminLogado');
  location.href = 'login.html';
});

let currentPage = 1;
const PER_PAGE = 8;
let editingId = null;

function getFiltered() {
  const search = (document.getElementById('searchAnimal')?.value || '').toLowerCase();
  const especie = document.getElementById('filtroEspecieAdmin')?.value || '';
  const porte = document.getElementById('filtroPorteAdmin')?.value || '';
  const idade = document.getElementById('filtroIdadeAdmin')?.value || '';
  const status = document.getElementById('filtroStatusAdmin')?.value || '';

  return getPets().filter(p => {
    if (search && !p.nome.toLowerCase().includes(search)) return false;
    if (especie && p.especie !== especie) return false;
    if (porte && p.porte !== porte) return false;
    if (idade && p.idadeCategoria !== idade) return false;
    if (status && p.status !== status) return false;
    return true;
  });
}

function render() {
  const filtered = getFiltered();
  const start = (currentPage - 1) * PER_PAGE;
  const page = filtered.slice(start, start + PER_PAGE);
  const tbody = document.getElementById('animaisTable');

  tbody.innerHTML = page.map(p => `
    <tr>
      <td style="display:flex;align-items:center;gap:10px;">
        <span style="font-size:1.5rem">${p.emoji}</span>
        <strong>${p.nome}</strong>
      </td>
      <td>${p.especie}</td>
      <td>${p.porte}</td>
      <td>${p.idade}</td>
      <td><span class="status-badge ${p.status === 'Disponível' ? 'disponivel' : 'adotado'}">${p.status}</span></td>
      <td>
        <div class="action-btns">
          <button class="action-btn edit" title="Editar" onclick="editarAnimal(${p.id})"><i class="fa-solid fa-pen"></i></button>
          <button class="action-btn delete" title="Remover" onclick="deletarAnimal(${p.id})"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('') || '<tr><td colspan="6" style="color:var(--gray-400);text-align:center;padding:32px">Nenhum animal encontrado</td></tr>';

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const pag = document.getElementById('paginationAdmin');
  pag.innerHTML = '';
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.className = 'page-btn' + (i === currentPage ? ' active' : '');
    btn.textContent = i;
    btn.addEventListener('click', () => { currentPage = i; render(); });
    pag.appendChild(btn);
  }
}

// Abrir modal novo animal
document.getElementById('btnNovoAnimal')?.addEventListener('click', () => {
  editingId = null;
  document.getElementById('modalTitle').textContent = 'Novo Animal';
  document.getElementById('formAnimal').reset();
  document.getElementById('animalId').value = '';
  document.getElementById('modalAnimal').classList.remove('hidden');
});

// Fechar modal
function closeModal() {
  document.getElementById('modalAnimal').classList.add('hidden');
}
document.getElementById('modalClose')?.addEventListener('click', closeModal);
document.getElementById('btnCancelar')?.addEventListener('click', closeModal);
document.getElementById('modalAnimal')?.addEventListener('click', (e) => {
  if (e.target === document.getElementById('modalAnimal')) closeModal();
});

// Editar animal
window.editarAnimal = function(id) {
  const pet = getPets().find(p => p.id === id);
  if (!pet) return;
  editingId = id;
  document.getElementById('modalTitle').textContent = 'Editar Animal';
  document.getElementById('animalId').value = pet.id;
  document.getElementById('animalNome').value = pet.nome;
  document.getElementById('animalEspecie').value = pet.especie;
  document.getElementById('animalPorte').value = pet.porte;
  document.getElementById('animalIdade').value = pet.idade;
  document.getElementById('animalSexo').value = pet.sexo;
  document.getElementById('animalDescricao').value = pet.descricao;
  document.getElementById('animalVacinado').checked = pet.vacinado;
  document.getElementById('animalCastrado').checked = pet.castrado;
  document.getElementById('animalVermifugado').checked = pet.vermifugado;
  document.getElementById('animalNecessidades').checked = pet.necessidades;
  document.getElementById('animalStatus').value = pet.status;
  document.getElementById('modalAnimal').classList.remove('hidden');
};

// Deletar animal
window.deletarAnimal = function(id) {
  if (!confirm('Tem certeza que deseja remover este animal?')) return;
  const pets = getPets().filter(p => p.id !== id);
  savePets(pets);
  render();
};

// Salvar animal
document.getElementById('formAnimal')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const pets = getPets();

  const idadeVal = document.getElementById('animalIdade').value;
  let idadeCat = 'Adulto';
  if (idadeVal.toLowerCase().includes('filhote') || idadeVal.includes('meses') || idadeVal.includes('mês')) idadeCat = 'Filhote';
  else if (idadeVal.includes('7') || idadeVal.includes('8') || idadeVal.includes('9') || idadeVal.includes('10') || idadeVal.includes('11') || idadeVal.includes('12')) idadeCat = 'Idoso';

  const especie = document.getElementById('animalEspecie').value;
  const emoji = especie === 'Gato' ? '🐈' : '🐕';

  if (editingId) {
    const idx = pets.findIndex(p => p.id === editingId);
    if (idx > -1) {
      pets[idx] = {
        ...pets[idx],
        nome: document.getElementById('animalNome').value,
        especie, emoji,
        porte: document.getElementById('animalPorte').value,
        idade: idadeVal, idadeCategoria: idadeCat,
        sexo: document.getElementById('animalSexo').value,
        descricao: document.getElementById('animalDescricao').value,
        vacinado: document.getElementById('animalVacinado').checked,
        castrado: document.getElementById('animalCastrado').checked,
        vermifugado: document.getElementById('animalVermifugado').checked,
        necessidades: document.getElementById('animalNecessidades').checked,
        status: document.getElementById('animalStatus').value,
      };
    }
  } else {
    const newId = Math.max(0, ...pets.map(p => p.id)) + 1;
    pets.push({
      id: newId, emoji,
      nome: document.getElementById('animalNome').value,
      especie, porte: document.getElementById('animalPorte').value,
      idade: idadeVal, idadeCategoria: idadeCat,
      sexo: document.getElementById('animalSexo').value,
      descricao: document.getElementById('animalDescricao').value,
      vacinado: document.getElementById('animalVacinado').checked,
      castrado: document.getElementById('animalCastrado').checked,
      vermifugado: document.getElementById('animalVermifugado').checked,
      necessidades: document.getElementById('animalNecessidades').checked,
      status: document.getElementById('animalStatus').value,
      ong: 'ONG Amor Animal',
    });
  }

  savePets(pets);
  closeModal();
  render();
});

// Filtros
['searchAnimal','filtroEspecieAdmin','filtroPorteAdmin','filtroIdadeAdmin','filtroStatusAdmin'].forEach(id => {
  document.getElementById(id)?.addEventListener('input', () => { currentPage = 1; render(); });
  document.getElementById(id)?.addEventListener('change', () => { currentPage = 1; render(); });
});

render();
