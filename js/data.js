// =====================
// DATA.JS – Base de dados simulada
// =====================

const PETS = [
  {
    id: 1, nome: 'Thor', especie: 'Cachorro', porte: 'Grande', idade: '4 anos',
    idadeCategoria: 'Adulto', sexo: 'Macho', descricao: 'Thor é um cachorro muito carinhoso, ativo e se dá bem com pessoas e outros animais. Adora passear e brincar. Está vacinado e vermifugado.',
    vacinado: true, castrado: true, vermifugado: true, necessidades: false,
    status: 'Disponível', ong: 'ONG Amor Animal', emoji: '🐕'
  },
  {
    id: 2, nome: 'Luna', especie: 'Gato', porte: 'Médio', idade: '3 anos',
    idadeCategoria: 'Adulto', sexo: 'Fêmea', descricao: 'Luna é uma gatinha dócil e tranquila. Adora colos e ambientes calmos. Ideal para apartamentos.',
    vacinado: true, castrado: true, vermifugado: true, necessidades: false,
    status: 'Disponível', ong: 'ONG Amor Animal', emoji: '🐈'
  },
  {
    id: 3, nome: 'Mel', especie: 'Cachorro', porte: 'Médio', idade: '2 anos',
    idadeCategoria: 'Adulto', sexo: 'Fêmea', descricao: 'Mel é energética e ama brincadeiras. Vai bem com crianças e outros cachorros.',
    vacinado: true, castrado: false, vermifugado: true, necessidades: false,
    status: 'Disponível', ong: 'ONG Patinhas', emoji: '🐩'
  },
  {
    id: 4, nome: 'Bolinha', especie: 'Gato', porte: 'Pequeno', idade: '6 meses',
    idadeCategoria: 'Filhote', sexo: 'Macho', descricao: 'Bolinha é um filhotinho cheio de energia e curiosidade. Ótimo companheiro para quem quer um gatinho desde pequeno.',
    vacinado: false, castrado: false, vermifugado: true, necessidades: false,
    status: 'Disponível', ong: 'ONG Amor Animal', emoji: '😺'
  },
  {
    id: 5, nome: 'Paquito', especie: 'Cachorro', porte: 'Pequeno', idade: 'Todos',
    idadeCategoria: 'Adulto', sexo: 'Macho', descricao: 'Paquito é um cãozinho alegre e comunicativo. Adora estar perto de pessoas.',
    vacinado: true, castrado: true, vermifugado: true, necessidades: false,
    status: 'Disponível', ong: 'ONG Patinhas', emoji: '🐶'
  },
  {
    id: 6, nome: 'Nina', especie: 'Gato', porte: 'Pequeno', idade: 'Todos',
    idadeCategoria: 'Adulto', sexo: 'Fêmea', descricao: 'Nina é independente mas muito carinhosa quando quer. Vai bem em lares tranquilos.',
    vacinado: true, castrado: true, vermifugado: true, necessidades: false,
    status: 'Disponível', ong: 'ONG Amor Animal', emoji: '🐱'
  },
  {
    id: 7, nome: 'Rex', especie: 'Cachorro', porte: 'Grande', idade: '5 anos',
    idadeCategoria: 'Adulto', sexo: 'Macho', descricao: 'Rex é leal e protetor. Precisa de espaço e exercício. Ótimo companheiro para famílias ativas.',
    vacinado: true, castrado: true, vermifugado: true, necessidades: false,
    status: 'Disponível', ong: 'ONG Patinhas', emoji: '🦮'
  },
  {
    id: 8, nome: 'Fifi', especie: 'Cachorro', porte: 'Pequeno', idade: '1 ano',
    idadeCategoria: 'Filhote', sexo: 'Fêmea', descricao: 'Fifi é linda e cheia de amor. Perfeita para apartamentos e famílias com crianças.',
    vacinado: true, castrado: false, vermifugado: true, necessidades: false,
    status: 'Disponível', ong: 'ONG Amor Animal', emoji: '🐕‍🦺'
  },
  {
    id: 9, nome: 'Simba', especie: 'Gato', porte: 'Grande', idade: '7 anos',
    idadeCategoria: 'Idoso', sexo: 'Macho', descricao: 'Simba é um gato maduro e calmo. Tem necessidades especiais de alimentação. Busca um lar tranquilo.',
    vacinado: true, castrado: true, vermifugado: true, necessidades: true,
    status: 'Disponível', ong: 'ONG Patinhas', emoji: '🐯'
  },
  {
    id: 10, nome: 'Pipoca', especie: 'Cachorro', porte: 'Pequeno', idade: '3 meses',
    idadeCategoria: 'Filhote', sexo: 'Fêmea', descricao: 'Pipoca é fofa e brincalhona. Está crescendo e precisa de muito amor e cuidado.',
    vacinado: false, castrado: false, vermifugado: false, necessidades: false,
    status: 'Disponível', ong: 'ONG Amor Animal', emoji: '🐾'
  },
  {
    id: 11, nome: 'Branco', especie: 'Gato', porte: 'Médio', idade: '2 anos',
    idadeCategoria: 'Adulto', sexo: 'Macho', descricao: 'Branco é tímido no começo mas se torna muito apegado. Gosta de ambientes calmos.',
    vacinado: true, castrado: true, vermifugado: true, necessidades: false,
    status: 'Disponível', ong: 'ONG Patinhas', emoji: '🤍'
  },
  {
    id: 12, nome: 'Duque', especie: 'Cachorro', porte: 'Grande', idade: '6 anos',
    idadeCategoria: 'Idoso', sexo: 'Macho', descricao: 'Duque é um cachorro idoso que merece um lar tranquilo para seus anos dourados.',
    vacinado: true, castrado: true, vermifugado: true, necessidades: true,
    status: 'Disponível', ong: 'ONG Amor Animal', emoji: '🐕'
  },
];

const INTERESSADOS = [
  { nome: 'Juliana Souza', email: 'juliana@email.com', pet: 'Thor', data: '04/05/2026', status: 'Novo' },
  { nome: 'Carlos Lima', email: 'carlos@email.com', pet: 'Luna', data: '03/05/2026', status: 'Em análise' },
  { nome: 'Mariana Alves', email: 'mariana@email.com', pet: 'Mel', data: '02/05/2026', status: 'Aprovado' },
];

// Salvar em localStorage se ainda não existir
if (!localStorage.getItem('pets')) {
  localStorage.setItem('pets', JSON.stringify(PETS));
}
if (!localStorage.getItem('interessados')) {
  localStorage.setItem('interessados', JSON.stringify(INTERESSADOS));
}

function getPets() {
  return JSON.parse(localStorage.getItem('pets')) || PETS;
}
function savePets(pets) {
  localStorage.setItem('pets', JSON.stringify(pets));
}
function getInteressados() {
  return JSON.parse(localStorage.getItem('interessados')) || INTERESSADOS;
}
function saveInteressados(list) {
  localStorage.setItem('interessados', JSON.stringify(list));
}
