// dashboard.js

// Verificar login
if (!localStorage.getItem('adminLogado')) {
  location.href = 'login.html';
}

document.getElementById('logoutBtn')?.addEventListener('click', (e) => {
  e.preventDefault();
  localStorage.removeItem('adminLogado');
  location.href = 'login.html';
});

// Atualizar cards
const pets = getPets();
const interessados = getInteressados();
const disponiveis = pets.filter(p => p.status === 'Disponível').length;
const adotados = pets.filter(p => p.status === 'Adotado').length;

document.getElementById('totalAnimais').textContent = pets.length;
document.getElementById('totalAdocao').textContent = disponiveis;
document.getElementById('totalFinalizadas').textContent = adotados;
document.getElementById('totalInteressados').textContent = interessados.length;

// Bar chart simulado
const barData = [
  { mes: 'Jan', val: 4 }, { mes: 'Fev', val: 7 }, { mes: 'Mar', val: 5 },
  { mes: 'Abr', val: 9 }, { mes: 'Mai', val: 6 }, { mes: 'Jun', val: 3 },
];
const maxVal = Math.max(...barData.map(d => d.val));
const barChart = document.getElementById('barChart');
if (barChart) {
  barChart.innerHTML = barData.map(d => `
    <div class="bar" style="height:${(d.val / maxVal) * 100}%" title="${d.mes}: ${d.val} adoções">
      <span class="bar-label">${d.mes}</span>
    </div>
  `).join('');
}

// Tabela interessados
const tbody = document.getElementById('interessadosTable');
if (tbody) {
  tbody.innerHTML = interessados.slice(0, 5).map(i => `
    <tr>
      <td>${i.nome}</td>
      <td>${i.email}</td>
      <td>${i.pet}</td>
      <td>${i.data}</td>
      <td><span class="status-badge ${i.status === 'Novo' ? 'novo' : i.status === 'Em análise' ? 'em-analise' : 'aprovado'}">${i.status}</span></td>
    </tr>
  `).join('');
}
