const router = require('express').Router();
const db = require('../database');
const auth = require('../middleware/auth');

function boolify(pet) {
  return {
    ...pet,
    vacinado: !!pet.vacinado,
    castrado: !!pet.castrado,
    vermifugado: !!pet.vermifugado,
    necessidades: !!pet.necessidades,
  };
}

// GET /api/pets  — público, suporta query params de filtro
router.get('/', (req, res) => {
  const { especie, porte, idadeCategoria, sexo, necessidades, status, search } = req.query;
  let query = 'SELECT * FROM pets WHERE 1=1';
  const params = [];

  if (especie)        { query += ' AND especie = ?';        params.push(especie); }
  if (porte)          { query += ' AND porte = ?';          params.push(porte); }
  if (idadeCategoria) { query += ' AND idadeCategoria = ?'; params.push(idadeCategoria); }
  if (sexo)           { query += ' AND sexo = ?';           params.push(sexo); }
  if (necessidades === 'sim') { query += ' AND necessidades = 1'; }
  if (necessidades === 'nao') { query += ' AND necessidades = 0'; }
  if (status)         { query += ' AND status = ?';         params.push(status); }
  if (search)         { query += ' AND nome LIKE ?';        params.push(`%${search}%`); }

  query += ' ORDER BY id DESC';
  const pets = db.prepare(query).all(...params);
  res.json(pets.map(boolify));
});

// GET /api/pets/:id — público
router.get('/:id', (req, res) => {
  const pet = db.prepare('SELECT * FROM pets WHERE id = ?').get(req.params.id);
  if (!pet) return res.status(404).json({ message: 'Animal não encontrado' });
  res.json(boolify(pet));
});

// POST /api/pets — protegido
router.post('/', auth, (req, res) => {
  const { nome, especie, porte, idade, idadeCategoria, sexo, descricao, vacinado, castrado, vermifugado, necessidades, status, ong } = req.body;
  if (!nome || !especie || !porte || !idade || !sexo) {
    return res.status(400).json({ message: 'Campos obrigatórios: nome, espécie, porte, idade, sexo' });
  }
  const emoji = especie === 'Gato' ? '🐈' : '🐕';
  const result = db.prepare(`
    INSERT INTO pets (nome, especie, porte, idade, idadeCategoria, sexo, descricao, vacinado, castrado, vermifugado, necessidades, status, ong, emoji)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(nome, especie, porte, idade, idadeCategoria || 'Adulto', sexo, descricao || '', vacinado ? 1 : 0, castrado ? 1 : 0, vermifugado ? 1 : 0, necessidades ? 1 : 0, status || 'Disponível', ong || 'ONG Amor Animal', emoji);

  const newPet = db.prepare('SELECT * FROM pets WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(boolify(newPet));
});

// PUT /api/pets/:id — protegido
router.put('/:id', auth, (req, res) => {
  const pet = db.prepare('SELECT * FROM pets WHERE id = ?').get(req.params.id);
  if (!pet) return res.status(404).json({ message: 'Animal não encontrado' });

  const { nome, especie, porte, idade, idadeCategoria, sexo, descricao, vacinado, castrado, vermifugado, necessidades, status, ong } = req.body;
  const novaEspecie = especie || pet.especie;
  const emoji = novaEspecie === 'Gato' ? '🐈' : '🐕';

  db.prepare(`
    UPDATE pets SET nome=?, especie=?, porte=?, idade=?, idadeCategoria=?, sexo=?, descricao=?,
    vacinado=?, castrado=?, vermifugado=?, necessidades=?, status=?, ong=?, emoji=? WHERE id=?
  `).run(
    nome || pet.nome, novaEspecie, porte || pet.porte, idade || pet.idade,
    idadeCategoria || pet.idadeCategoria, sexo || pet.sexo, descricao ?? pet.descricao,
    vacinado !== undefined ? (vacinado ? 1 : 0) : pet.vacinado,
    castrado  !== undefined ? (castrado  ? 1 : 0) : pet.castrado,
    vermifugado !== undefined ? (vermifugado ? 1 : 0) : pet.vermifugado,
    necessidades !== undefined ? (necessidades ? 1 : 0) : pet.necessidades,
    status || pet.status, ong || pet.ong, emoji, req.params.id
  );

  res.json(boolify(db.prepare('SELECT * FROM pets WHERE id = ?').get(req.params.id)));
});

// DELETE /api/pets/:id — protegido
router.delete('/:id', auth, (req, res) => {
  const pet = db.prepare('SELECT * FROM pets WHERE id = ?').get(req.params.id);
  if (!pet) return res.status(404).json({ message: 'Animal não encontrado' });
  db.prepare('DELETE FROM pets WHERE id = ?').run(req.params.id);
  res.json({ message: 'Animal removido com sucesso' });
});

module.exports = router;
