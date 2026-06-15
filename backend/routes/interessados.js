const router = require('express').Router();
const db = require('../database');
const auth = require('../middleware/auth');

// GET /api/interessados — protegido
router.get('/', auth, (req, res) => {
  const list = db.prepare(`
    SELECT i.*, p.nome AS petNome
    FROM interessados i
    LEFT JOIN pets p ON i.petId = p.id
    ORDER BY i.id DESC
  `).all();
  res.json(list);
});

// POST /api/interessados — público (formulário de adoção)
router.post('/', (req, res) => {
  const { nome, email, cpf, telefone, endereco, tipoResidencia, temAnimais, temCriancas, rendaMensal, animalInteresse, petId } = req.body;
  if (!nome || !email) {
    return res.status(400).json({ message: 'Nome e e-mail são obrigatórios' });
  }
  const data = new Date().toLocaleDateString('pt-BR');
  const result = db.prepare(`
    INSERT INTO interessados (nome, email, cpf, telefone, endereco, tipoResidencia, temAnimais, temCriancas, rendaMensal, animalInteresse, petId, data, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Novo')
  `).run(nome, email, cpf || null, telefone || null, endereco || null, tipoResidencia || null, temAnimais || null, temCriancas || null, rendaMensal || null, animalInteresse || null, petId || null, data);

  res.status(201).json({ id: result.lastInsertRowid, message: 'Formulário enviado com sucesso!' });
});

// PATCH /api/interessados/:id/status — protegido
router.patch('/:id/status', auth, (req, res) => {
  const { status } = req.body;
  const item = db.prepare('SELECT id FROM interessados WHERE id = ?').get(req.params.id);
  if (!item) return res.status(404).json({ message: 'Não encontrado' });
  db.prepare('UPDATE interessados SET status = ? WHERE id = ?').run(status, req.params.id);
  res.json({ message: 'Status atualizado' });
});

module.exports = router;
