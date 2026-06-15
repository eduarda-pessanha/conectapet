const BASE = '/api';

async function request(path, options = {}) {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(BASE + path, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || 'Erro na requisição');
  }
  return res.json();
}

export const api = {
  // Pets (públicos)
  getPets: (params = '') => request(`/pets${params}`),
  getPet: (id) => request(`/pets/${id}`),

  // Pets (protegidos)
  createPet: (data) => request('/pets', { method: 'POST', body: JSON.stringify(data) }),
  updatePet: (id, data) => request(`/pets/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deletePet: (id) => request(`/pets/${id}`, { method: 'DELETE' }),

  // Interessados
  getInteressados: () => request('/interessados'),
  createInteressado: (data) => request('/interessados', { method: 'POST', body: JSON.stringify(data) }),
  updateStatus: (id, status) => request(`/interessados/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),

  // Auth
  login: (email, senha) => request('/auth/login', { method: 'POST', body: JSON.stringify({ email, senha }) }),
};
