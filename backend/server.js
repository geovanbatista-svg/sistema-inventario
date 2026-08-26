const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const itemsRoutes = require('./routes/items');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/items', itemsRoutes);

// Teste de conexão
app.get('/api', (req, res) => {
  res.json({ message: 'Backend do Sistema de Inventário/Doação' });
});



// Servir os arquivos do frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// Página inicial
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "index.html"));
});
// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
