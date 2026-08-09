# 🐾 ConectaPet

Plataforma para gestão e divulgação de animais resgatados por ONGs, conectando instituições a potenciais adotantes.

## Sobre o projeto

O ConectaPet centraliza o catálogo de animais disponíveis para adoção, permite que interessados enviem formulários de pré-adoção e oferece um painel administrativo autenticado para as ONGs gerenciarem seus animais e acompanharem os interessados.

## Funcionalidades

- 🔍 Catálogo público de animais com filtros por espécie, porte, idade, sexo e necessidades especiais
- 📄 Página de detalhes de cada animal (histórico, vacinação, castração, temperamento)
- 📝 Formulário de pré-adoção para interessados
- 🔐 Autenticação de administradores via JWT
- 📊 Painel administrativo (dashboard) para ONGs gerenciarem animais e triagem de interessados
- 🛡️ Rotas protegidas por middleware de autenticação

## Tecnologias

**Frontend**
- React 18 + Vite
- React Router DOM

**Backend**
- Node.js + Express
- better-sqlite3 (banco de dados SQLite)
- JSON Web Token (JWT) para autenticação
- bcryptjs para hash de senhas
- CORS + dotenv

## Arquitetura

```
upx4-main/
├── backend/
│   ├── server.js          # Entrada da API Express
│   ├── database.js        # Schema, seed e conexão SQLite
│   ├── middleware/auth.js # Middleware de autenticação JWT
│   └── routes/
│       ├── pets.js         # CRUD de animais (rotas públicas e protegidas)
│       ├── interessados.js # Formulário de adoção e triagem
│       └── auth.js         # Login e emissão de token
└── frontend/
    └── src/
        ├── api/api.js       # Client HTTP centralizado (fetch + Bearer token)
        ├── pages/           # Home, Catálogo, Detalhes, Formulário, Admin
        └── components/      # Navbar, Sidebar, PetCard, Footer
```

A API expõe rotas públicas para consulta de animais e envio de formulário de interesse, e rotas protegidas (criação/edição/exclusão de animais, listagem de interessados) que exigem um token JWT válido, verificado pelo middleware `auth.js`.

## Como executar

**Backend**
```bash
cd backend
npm install
npm run dev   # http://localhost:3001
```

**Frontend**
```bash
cd frontend
npm install
npm run dev   # http://localhost:5173
```

**Login administrativo (demo)**
```
email: admin@conectapet.com
senha: 123456
```

## Rotas da API

| Método | Rota | Acesso | Descrição |
|---|---|---|---|
| GET | `/api/pets` | Público | Lista animais (aceita filtros via query params) |
| GET | `/api/pets/:id` | Público | Detalhes de um animal |
| POST | `/api/pets` | Protegido | Cadastra um animal |
| PUT | `/api/pets/:id` | Protegido | Atualiza um animal |
| DELETE | `/api/pets/:id` | Protegido | Remove um animal |
| POST | `/api/interessados` | Público | Envia formulário de pré-adoção |
| GET | `/api/interessados` | Protegido | Lista interessados |
| PATCH | `/api/interessados/:id/status` | Protegido | Atualiza status de triagem |
| POST | `/api/auth/login` | Público | Autentica e retorna token JWT |

## Origem

Este projeto nasceu como trabalho da disciplina Usina de Projetos Experimentais (Universidade Newton Paiva) e foi levado além do escopo acadêmico: em vez de um protótipo estático, foi implementada uma aplicação full stack funcional, com persistência real em banco de dados e autenticação.

## Autora

**Eduarda Pessanha** — [LinkedIn](https://linkedin.com/in/eduarda-pessanha)
