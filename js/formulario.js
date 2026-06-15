// formulario.js

// Preencher select de animais
const petSelect = document.getElementById('petId');
if (petSelect) {
  const pets = getPets().filter(p => p.status === 'Disponível');
  pets.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.id;
    opt.textContent = `${p.emoji} ${p.nome} – ${p.especie}`;
    petSelect.appendChild(opt);
  });

  // Pré-selecionar se veio de pet-detail.html
  const params = new URLSearchParams(location.search);
  const petId = params.get('pet');
  if (petId) petSelect.value = petId;
}

// Máscara CPF
const cpfInput = document.getElementById('cpf');
cpfInput?.addEventListener('input', () => {
  let v = cpfInput.value.replace(/\D/g, '').slice(0, 11);
  v = v.replace(/(\d{3})(\d)/, '$1.$2');
  v = v.replace(/(\d{3})(\d)/, '$1.$2');
  v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  cpfInput.value = v;
});

// Máscara telefone
const telInput = document.getElementById('telefone');
telInput?.addEventListener('input', () => {
  let v = telInput.value.replace(/\D/g, '').slice(0, 11);
  if (v.length > 10) {
    v = v.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  } else {
    v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
  }
  telInput.value = v;
});

// Submissão
const form = document.getElementById('formAdocao');
form?.addEventListener('submit', (e) => {
  e.preventDefault();

  // Validação simples
  let valid = true;
  form.querySelectorAll('[required]').forEach(el => {
    if (!el.value.trim()) {
      el.classList.add('error');
      valid = false;
    } else {
      el.classList.remove('error');
    }
  });

  const check = document.getElementById('aceitaTermos');
  if (check && !check.checked) {
    check.parentElement.style.color = 'var(--red)';
    valid = false;
  } else if (check) {
    check.parentElement.style.color = '';
  }

  if (!valid) return;

  // Salvar no localStorage
  const dados = {
    nome: document.getElementById('nome').value,
    email: document.getElementById('email').value,
    cpf: document.getElementById('cpf').value,
    telefone: document.getElementById('telefone').value,
    endereco: document.getElementById('endereco').value,
    tipoResidencia: document.getElementById('tipoResidencia').value,
    temAnimais: document.getElementById('temAnimais').value,
    temCriancas: document.getElementById('temCriancas').value,
    rendaMensal: document.getElementById('rendaMensal').value,
    animalInteresse: document.getElementById('animalInteresse').value,
    petId: document.getElementById('petId').value,
    data: new Date().toLocaleDateString('pt-BR'),
    status: 'Novo'
  };

  const pets = getPets();
  const pet = pets.find(p => p.id == dados.petId);
  const interessados = getInteressados();
  interessados.unshift({
    nome: dados.nome,
    email: dados.email,
    pet: pet ? pet.nome : 'Qualquer',
    data: dados.data,
    status: 'Novo'
  });
  saveInteressados(interessados);

  document.getElementById('modalSucesso').classList.remove('hidden');
});

// Remover erro ao digitar
form?.querySelectorAll('input, select, textarea').forEach(el => {
  el.addEventListener('input', () => el.classList.remove('error'));
});
