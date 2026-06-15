// admin-login.js

const form = document.getElementById('loginForm');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const senha = document.getElementById('loginSenha').value;

  if (email === 'admin@conectapet.com' && senha === '123456') {
    localStorage.setItem('adminLogado', 'true');
    location.href = 'dashboard.html';
  } else {
    document.getElementById('loginErro').classList.remove('hidden');
  }
});

document.getElementById('toggleSenha')?.addEventListener('click', () => {
  const input = document.getElementById('loginSenha');
  const icon = document.querySelector('#toggleSenha i');
  if (input.type === 'password') {
    input.type = 'text';
    icon.className = 'fa-solid fa-eye-slash';
  } else {
    input.type = 'password';
    icon.className = 'fa-solid fa-eye';
  }
});

// Limpar erro ao digitar
['loginEmail','loginSenha'].forEach(id => {
  document.getElementById(id)?.addEventListener('input', () => {
    document.getElementById('loginErro').classList.add('hidden');
  });
});
