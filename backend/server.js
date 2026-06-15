require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5174', 'http://127.0.0.1:5173', 'http://127.0.0.1:5174'] }));
app.use(express.json());

app.use('/api/pets', require('./routes/pets'));
app.use('/api/interessados', require('./routes/interessados'));
app.use('/api/auth', require('./routes/auth'));

app.get('/api/health', (_req, res) => res.json({ status: 'ok', app: 'ConectaPet API' }));

// Handler de erros global
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erro interno do servidor' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ ConectaPet API rodando em http://localhost:${PORT}`);
});
