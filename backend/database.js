const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const path = require('path');

const db = new Database(path.join(__dirname, 'conectapet.db'));

// Habilitar foreign keys
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// Criar tabelas
db.exec(`
  CREATE TABLE IF NOT EXISTS pets (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    nome          TEXT    NOT NULL,
    especie       TEXT    NOT NULL,
    porte         TEXT    NOT NULL,
    idade         TEXT    NOT NULL,
    idadeCategoria TEXT   NOT NULL DEFAULT 'Adulto',
    sexo          TEXT    NOT NULL,
    descricao     TEXT,
    vacinado      INTEGER NOT NULL DEFAULT 0,
    castrado      INTEGER NOT NULL DEFAULT 0,
    vermifugado   INTEGER NOT NULL DEFAULT 0,
    necessidades  INTEGER NOT NULL DEFAULT 0,
    status        TEXT    NOT NULL DEFAULT 'Disponível',
    ong           TEXT,
    emoji         TEXT    DEFAULT '🐾',
    criadoEm      TEXT    DEFAULT (date('now'))
  );

  CREATE TABLE IF NOT EXISTS interessados (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    nome            TEXT NOT NULL,
    email           TEXT NOT NULL,
    cpf             TEXT,
    telefone        TEXT,
    endereco        TEXT,
    tipoResidencia  TEXT,
    temAnimais      TEXT,
    temCriancas     TEXT,
    rendaMensal     TEXT,
    animalInteresse TEXT,
    petId           INTEGER REFERENCES pets(id) ON DELETE SET NULL,
    data            TEXT,
    status          TEXT NOT NULL DEFAULT 'Novo'
  );

  CREATE TABLE IF NOT EXISTS usuarios (
    id    INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT    UNIQUE NOT NULL,
    senha TEXT    NOT NULL,
    nome  TEXT,
    role  TEXT    NOT NULL DEFAULT 'admin'
  );
`);

// Seed: pets
const petCount = db.prepare('SELECT COUNT(*) as c FROM pets').get();
if (petCount.c === 0) {
  const ins = db.prepare(`
    INSERT INTO pets (nome, especie, porte, idade, idadeCategoria, sexo, descricao, vacinado, castrado, vermifugado, necessidades, status, ong, emoji)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const seedMany = db.transaction((rows) => rows.forEach(r => ins.run(...r)));
  seedMany([
    ['Thor',    'Cachorro','Grande', '4 anos',   'Adulto',  'Macho', 'Thor é carinhoso, ativo e se dá bem com pessoas e outros animais. Adora passear e brincar.', 1,1,1,0,'Disponível','ONG Amor Animal','🐕'],
    ['Luna',    'Gato',    'Médio',  '3 anos',   'Adulto',  'Fêmea', 'Luna é dócil e tranquila. Adora colos e ambientes calmos. Ideal para apartamentos.',        1,1,1,0,'Disponível','ONG Amor Animal','🐈'],
    ['Mel',     'Cachorro','Médio',  '2 anos',   'Adulto',  'Fêmea', 'Mel é energética e ama brincadeiras. Vai bem com crianças e outros cachorros.',             1,0,1,0,'Disponível','ONG Patinhas',  '🐩'],
    ['Bolinha', 'Gato',    'Pequeno','6 meses',  'Filhote', 'Macho', 'Bolinha é um filhotinho cheio de energia e curiosidade. Ótimo para quem quer criar desde bebê.',0,0,1,0,'Disponível','ONG Amor Animal','😺'],
    ['Paquito', 'Cachorro','Pequeno','2 anos',   'Adulto',  'Macho', 'Paquito é alegre e comunicativo. Adora estar perto de pessoas.',                           1,1,1,0,'Disponível','ONG Patinhas',  '🐶'],
    ['Nina',    'Gato',    'Pequeno','1 ano',    'Adulto',  'Fêmea', 'Nina é independente mas muito carinhosa quando quer. Vai bem em lares tranquilos.',         1,1,1,0,'Disponível','ONG Amor Animal','🐱'],
    ['Rex',     'Cachorro','Grande', '5 anos',   'Adulto',  'Macho', 'Rex é leal e protetor. Precisa de espaço e exercício. Ótimo para famílias ativas.',         1,1,1,0,'Disponível','ONG Patinhas',  '🦮'],
    ['Fifi',    'Cachorro','Pequeno','1 ano',    'Filhote', 'Fêmea', 'Fifi é linda e cheia de amor. Perfeita para apartamentos e famílias com crianças.',         1,0,1,0,'Disponível','ONG Amor Animal','🐕‍🦺'],
    ['Simba',   'Gato',    'Grande', '7 anos',   'Idoso',   'Macho', 'Simba é maduro e calmo. Tem necessidades especiais de alimentação. Busca lar tranquilo.',   1,1,1,1,'Disponível','ONG Patinhas',  '🐯'],
    ['Pipoca',  'Cachorro','Pequeno','3 meses',  'Filhote', 'Fêmea', 'Pipoca é fofa e brincalhona. Está crescendo e precisa de muito amor e cuidado.',            0,0,0,0,'Disponível','ONG Amor Animal','🐾'],
    ['Branco',  'Gato',    'Médio',  '2 anos',   'Adulto',  'Macho', 'Branco é tímido no começo mas se torna muito apegado. Gosta de ambientes calmos.',          1,1,1,0,'Disponível','ONG Patinhas',  '🤍'],
    ['Duque',   'Cachorro','Grande', '6 anos',   'Idoso',   'Macho', 'Duque é um cachorro idoso que merece um lar tranquilo para seus anos dourados.',            1,1,1,1,'Disponível','ONG Amor Animal','🐕'],
  ]);
}

// Seed: usuário admin
const userCount = db.prepare('SELECT COUNT(*) as c FROM usuarios').get();
if (userCount.c === 0) {
  const hash = bcrypt.hashSync('123456', 10);
  db.prepare('INSERT INTO usuarios (email, senha, nome) VALUES (?, ?, ?)').run('admin@conectapet.com', hash, 'Admin ONG');
}

module.exports = db;
